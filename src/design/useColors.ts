import { palette, Colors } from './tokens';
import { useAppStore } from '../store/useAppStore';

/** Retourne les tokens de couleur du mode actif (jour ou nuit). */
export function useColors(): Colors {
  const isDayMode = useAppStore(s => s.isDayMode);
  return isDayMode ? palette.day : palette.night;
}
