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

interface Account {
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
  reference?: string;
  recipientAccountNumber?: string;
  recipientBank?: string;
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
    return JSON.parse(savedAccounts);
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
    return JSON.parse(savedTransactions);
  } catch {
    return initialTransactions;
  }
}

export function BankingProvider({
  children,
}: BankingProviderProps) {
  const [accounts, setAccounts] =
    useState<Account[]>(loadAccounts);

  const [transactions, setTransactions] =
    useState<Transaction[]>(
      loadTransactions
    );
   const [showBalance, setShowBalance] =
  useState(() => {
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

  function transferMoney(
    fromId: string,
    toId: string,
    amount: number
  ): boolean {
    if (fromId === toId) {
      return false;
    }

    if (amount <= 0) {
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

    if (!fromAccount || !toAccount) {
      return false;
    }

    if (fromAccount.balance < amount) {
      return false;
    }

    const updatedAccounts =
      accounts.map((account) => {
        if (account.id === fromId) {
          return {
            ...account,
            balance:
              account.balance - amount,
          };
        }

        if (account.id === toId) {
          return {
            ...account,
            balance:
              account.balance + amount,
          };
        }

        return account;
      });

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      accountId: fromId,
      merchant: "Account Transfer",
      description:
        `${fromAccount.name} → ${toAccount.name}`,
      date: new Date().toLocaleDateString(
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

    setAccounts(updatedAccounts);
    setTransactions(
      updatedTransactions
    );

    localStorage.setItem(
      "banking_accounts",
      JSON.stringify(updatedAccounts)
    );

    localStorage.setItem(
      "banking_transactions",
      JSON.stringify(
        updatedTransactions
      )
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
    if (amount <= 0) {
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

    if (account.balance < amount) {
      return false;
    }

    const updatedAccounts =
      accounts.map((item) => {
        if (item.id === accountId) {
          return {
            ...item,
            balance:
              item.balance - amount,
          };
        }

        return item;
      });

    const newTransaction: Transaction = {
  id: Date.now().toString(),
  accountId,
  merchant: biller,
  description: `Payment from ${account.name}`,
  date: new Date().toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ),
  amount: -amount,

  reference: `GFB-${Date.now()
    .toString()
    .slice(-10)}`,

  recipientAccountNumber,
  recipientBank,
};

    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    setAccounts(updatedAccounts);

    setTransactions(
      updatedTransactions
    );

    localStorage.setItem(
      "banking_accounts",
      JSON.stringify(updatedAccounts)
    );

    localStorage.setItem(
      "banking_transactions",
      JSON.stringify(
        updatedTransactions
      )
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

    setAccounts(initialAccounts);

    setTransactions(
      initialTransactions
    );
  }

  return (
    <BankingContext.Provider
  value={{
    accounts,
    transactions,
    showBalance,
    setShowBalance: handleSetShowBalance,
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
    useContext(BankingContext);

  if (!context) {
    throw new Error(
      "useBanking must be used inside BankingProvider"
    );
  }

  return context;
}