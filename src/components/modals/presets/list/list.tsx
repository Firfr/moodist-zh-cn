import { FaPlay, FaRegTrashAlt } from 'react-icons/fa/index';

import styles from './list.module.css';

import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

interface ListProps {
  close: () => void;
}

export function List({ close }: ListProps) {
  const presets = usePresetStore(state => state.presets);
  const changeName = usePresetStore(state => state.changeName);
  const deletePreset = usePresetStore(state => state.deletePreset);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);

  return (
    <div className={styles.list}>
      <h3 className={styles.title}>
      您的预设 {presets.length > 0 && `(${presets.length})`}
      </h3>

      {!presets.length && (
        <p className={styles.empty}>您尚未创建任何预设。</p>
      )}

      {presets.map(preset => (
        <div className={styles.preset} key={preset.id}>
          <input
            placeholder="Untitled"
            type="text"
            value={preset.label}
            onChange={e => changeName(preset.id, e.target.value)}
          />
          <button onClick={() => deletePreset(preset.id)}>
            <FaRegTrashAlt />
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              override(preset.sounds);
              play();
              close();
            }}
          >
            <FaPlay />
          </button>
        </div>
      ))}
    </div>
  );
}
