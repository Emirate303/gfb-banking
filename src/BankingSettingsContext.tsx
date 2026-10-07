import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface SettingsData {
  notifications: boolean;
  emailAlerts: boolean;
  securityAlerts: boolean;
}

interface BankingSettingsContextValue {
  settings: SettingsData;
  updateSetting: <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => void;
  resetSettings: () => void;
}

const defaultSettings: SettingsData = {
  notifications: true,
  emailAlerts: true,
  securityAlerts: true,
};

const SETTINGS_STORAGE_KEY = "banking_settings";

const BankingSettingsContext =
  createContext<BankingSettingsContextValue | undefined>(
    undefined
  );

function loadSettings(): SettingsData {
  const saved = localStorage.getItem(
    SETTINGS_STORAGE_KEY
  );

  if (!saved) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<SettingsData>;

    return {
      ...defaultSettings,
      ...parsed,
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
    useState<SettingsData>(loadSettings);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  function updateSetting<
    K extends keyof SettingsData
  >(
    key: K,
    value: SettingsData[K]
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetSettings() {
    setSettings(defaultSettings);
    localStorage.removeItem(
      SETTINGS_STORAGE_KEY
    );
  }

  return (
    <BankingSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
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