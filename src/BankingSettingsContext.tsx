import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SettingsData {
  compactMode: boolean;
  showBalances: boolean;
  rememberFilters: boolean;
}

const defaultSettings: SettingsData = {
  compactMode: false,
  showBalances: true,
  rememberFilters: true,
};

interface BankingSettingsContextType {
  settings: SettingsData;

  updateSetting: (
    key: keyof SettingsData,
    value: boolean
  ) => void;

  resetPreferences: () => void;
}

const BankingSettingsContext =
  createContext<
    BankingSettingsContextType | undefined
  >(undefined);

function loadSettings(): SettingsData {
  const savedSettings =
    localStorage.getItem(
      "banking_settings"
    );

  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    const parsedSettings =
      JSON.parse(savedSettings);

    return {
      ...defaultSettings,
      ...parsedSettings,
    };
  } catch {
    return defaultSettings;
  }
}

interface BankingSettingsProviderProps {
  children: ReactNode;
}

export function BankingSettingsProvider({
  children,
}: BankingSettingsProviderProps) {
  const [settings, setSettings] =
    useState<SettingsData>(
      loadSettings
    );

  useEffect(() => {
    localStorage.setItem(
      "banking_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  function updateSetting(
    key: keyof SettingsData,
    value: boolean
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  }

  function resetPreferences() {
    setSettings(defaultSettings);
  }

  return (
    <BankingSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetPreferences,
      }}
    >
      {children}
    </BankingSettingsContext.Provider>
  );
}

export function useBankingSettings() {
  const context = useContext(
    BankingSettingsContext
  );

  if (!context) {
    throw new Error(
      "useBankingSettings must be used inside BankingSettingsProvider"
    );
  }

  return context;
}