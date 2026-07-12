import { ValueOf } from '../../../core/models/utils.model';

export const LANGUAGES = {
  English: 'en',
  Ukrainian: 'uk',
} as const;

export type EnglishLanguage = typeof LANGUAGES.English;
export type UkrainianLanguage = typeof LANGUAGES.Ukrainian;
export type Language = ValueOf<typeof LANGUAGES>;

export const SETTINGS_KEYS = {
  ConfirmToRemove: 'confirmToRemove',
  DarkTheme: 'darkTheme',
  Language: 'language',
} as const;

export type Settings = {
  [SETTINGS_KEYS.ConfirmToRemove]: boolean;
  [SETTINGS_KEYS.DarkTheme]: boolean;
  [SETTINGS_KEYS.Language]: Language;
};
