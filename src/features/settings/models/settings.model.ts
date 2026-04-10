export const SETTINGS_KEYS = {
  ConfirmToRemove: 'confirmToRemove',
  DarkTheme: 'darkTheme',
} as const;

export type Settings = {
  [SETTINGS_KEYS.ConfirmToRemove]: boolean;
  [SETTINGS_KEYS.DarkTheme]: boolean;
};
