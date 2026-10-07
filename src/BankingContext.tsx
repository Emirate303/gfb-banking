import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  accounts as initialAccounts,
  transactions as initialTransactions,
} from "./data/mockData";

import { useNotifications } from "./NotificationContext";

export interface Account {
  id: string;
  name: string;
  type: string;
  number: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId?: string;
  merchant: string;
  description: string;
  date: string;
  amount: number;
  recipientAccountNumber?: string;
  recipientBank?: string;
  reference?: string;
}

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];

  showBalance: boolean;

  setShowBalance: (
    show: boolean
  ) => void;

  transferMoney: (
    fromId: string,
    toId: string,
    amount: number
  ) => boolean;

  makePayment: (
    accountId: string,
    biller: string,
    amount: number,
    recipientAccountNumber?: string,
    recipientBank?: string
  ) => boolean;

  resetBankingData: () => void;
}

const BankingContext =
  createContext<
    BankingContextType | undefined
  >(undefined);

interface BankingProviderProps {
  children: ReactNode;
}

function loadAccounts(): Account[] {
  const savedAccounts =
    localStorage.getItem(
      "banking_accounts"
    );

  if (!savedAccounts) {
    return initialAccounts;
  }

  try {
    return JSON.parse(
      savedAccounts
    ) as Account[];
  } catch {
    return initialAccounts;
  }
}

function loadTransactions(): Transaction[] {
  const savedTransactions =
    localStorage.getItem(
      "banking_transactions"
    );

  if (!savedTransactions) {
    return initialTransactions;
  }

  try {
    return JSON.parse(
      savedTransactions
    ) as Transaction[];
  } catch {
    return initialTransactions;
  }
}

export function BankingProvider({
  children,
}: BankingProviderProps) {
  const {
    addNotification,
  } = useNotifications();

  const [accounts, setAccounts] =
    useState<Account[]>(
      loadAccounts
    );

  const [transactions, setTransactions] =
    useState<Transaction[]>(
      loadTransactions
    );

  const [showBalance, setShowBalance] =
    useState<boolean>(() => {
      const saved =
        localStorage.getItem(
          "gfb_show_balance"
        );

      if (saved === null) {
        return true;
      }

      return saved === "true";
    });

  function handleSetShowBalance(
    show: boolean
  ) {
    setShowBalance(show);

    localStorage.setItem(
      "gfb_show_balance",
      String(show)
    );
  }

  function saveBankingData(
    updatedAccounts: Account[],
    updatedTransactions: Transaction[]
  ) {
    setAccounts(updatedAccounts);
    setTransactions(
      updatedTransactions
    );

    localStorage.setItem(
      "banking_accounts",
      JSON.stringify(
        updatedAccounts
      )
    );

    localStorage.setItem(
      "banking_transactions",
      JSON.stringify(
        updatedTransactions
      )
    );
  }

  function transferMoney(
    fromId: string,
    toId: string,
    amount: number
  ): boolean {
    if (fromId === toId) {
      return false;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return false;
    }

    const fromAccount =
      accounts.find(
        (account) =>
          account.id === fromId
      );

    const toAccount =
      accounts.find(
        (account) =>
          account.id === toId
      );

    if (
      !fromAccount ||
      !toAccount
    ) {
      return false;
    }

    if (
      fromAccount.balance <
      amount
    ) {
      return false;
    }

    const updatedAccounts =
      accounts.map((account) => {
        if (
          account.id === fromId
        ) {
          return {
            ...account,
            balance:
              account.balance -
              amount,
          };
        }

        if (
          account.id === toId
        ) {
          return {
            ...account,
            balance:
              account.balance +
              amount,
          };
        }

        return account;
      });

    const newTransaction: Transaction =
      {
        id:
          `transfer-${Date.now()}`,

        accountId: fromId,

        merchant:
          "Account Transfer",

        description:
          `${fromAccount.name} → ${toAccount.name}`,

        date:
          new Date().toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),

        amount: -amount,

        reference:
          `GFB-${Date.now()}`,
      };

    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    saveBankingData(
      updatedAccounts,
      updatedTransactions
    );

    addNotification(
      "Transfer completed",
      `$${amount.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} was transferred from ${
        fromAccount.name
      } to ${
        toAccount.name
      }.`,
      "success"
    );

    return true;
  }

  function makePayment(
    accountId: string,
    biller: string,
    amount: number,
    recipientAccountNumber?: string,
    recipientBank?: string
  ): boolean {
    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return false;
    }

    const account =
      accounts.find(
        (item) =>
          item.id === accountId
      );

    if (!account) {
      return false;
    }

    if (
      account.balance <
      amount
    ) {
      return false;
    }

    const updatedAccounts =
      accounts.map((item) => {
        if (
          item.id === accountId
        ) {
          return {
            ...item,
            balance:
              item.balance -
              amount,
          };
        }

        return item;
      });

    const newTransaction: Transaction =
      {
        id:
          `payment-${Date.now()}`,

        accountId,

        merchant: biller,

        description:
          `Payment from ${account.name}`,

        recipientAccountNumber,

        recipientBank,

        reference:
          `GFB-${Date.now()}`,

        date:
          new Date().toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),

        amount: -amount,
      };

    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    saveBankingData(
      updatedAccounts,
      updatedTransactions
    );

    addNotification(
      "Payment completed",
      `$${amount.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} payment sent to ${biller}.`,
      "success"
    );

    return true;
  }

  function resetBankingData() {
    localStorage.removeItem(
      "banking_accounts"
    );

    localStorage.removeItem(
      "banking_transactions"
    );

    setAccounts(
      initialAccounts
    );

    setTransactions(
      initialTransactions
    );

    addNotification(
      "Banking data reset",
      "Your account and transaction data has been restored to the starting state.",
      "info"
    );
  }

  return (
    <BankingContext.Provider
      value={{
        accounts,
        transactions,

        showBalance,

        setShowBalance:
          handleSetShowBalance,

        transferMoney,

        makePayment,

        resetBankingData,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
}

export function useBanking() {
  const context =
    useContext(
      BankingContext
    );

  if (!context) {
    throw new Error(
      "useBanking must be used inside BankingProvider"
    );
  }

  return context;
}