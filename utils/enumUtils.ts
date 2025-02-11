import { MangaType, MangaStatus, TranslationStatus } from '@/types/enums';

export const getMangaTypeName = (type: number): string => {
  return MangaType[type] || 'Unknown';
};

export const getMangaStatusName = (status: number): string => {
  return MangaStatus[status] || 'Unknown';
};

export const getTranslationStatusName = (status: number): string => {
  return TranslationStatus[status] || 'Unknown';
};