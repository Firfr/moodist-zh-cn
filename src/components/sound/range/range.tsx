import { useSoundStore } from '@/store';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);

  return (
    <input
      aria-labelledby={label}
      autoComplete="off"
      className={styles.range}
      disabled={!isSelected}
      max={100}
      min={0}
      type="range"
      value={volume * 100}
      onChange={e => isSelected && setVolume(id, Number(e.target.value) / 100)}
      onClick={e => e.stopPropagation()}
    />
  );
}