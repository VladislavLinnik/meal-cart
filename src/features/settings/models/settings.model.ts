import { ValueOf } from '../../../core/models/utils.model';
import { Unit } from '../../../core/models/ingredient.model';

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
  DefaultUnit: 'defaultUnit',
} as const;

export interface Settings {
  [SETTINGS_KEYS.ConfirmToRemove]: boolean;
  [SETTINGS_KEYS.DarkTheme]: boolean;
  [SETTINGS_KEYS.Language]: Language;
  [SETTINGS_KEYS.DefaultUnit]: Unit;
}
