import { useState, type FormEvent } from 'react';

import { cn } from '@/helpers/styles';
import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

import styles from './new.module.css';

export function New() {
  const [name, setName] = useState('');

  const noSelected = useSoundStore(state => state.noSelected());
  const sounds = useSoundStore(state => state.sounds);
  const addPreset = usePresetStore(state => state.addPreset);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || noSelected) return;

    const _sounds: Record<string, number> = {};

    Object.keys(sounds)
      .filter(id => sounds[id].isSelected)
      .forEach(id => {
        _sounds[id] = sounds[id].volume;
      });

    addPreset(name, _sounds);

    setName('');
  };

  return (
    <div className={styles.new}>
      <h3 className={styles.title}>新建预设</h3>

      <form
        className={cn(styles.form, noSelected && styles.disabled)}
        onSubmit={handleSubmit}
      >
        <input
          disabled={noSelected}
          placeholder="请输入预设名称"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button disabled={noSelected}>保存</button>
      </form>

      {noSelected && (
        <p className={styles.noSelected}>
          要创建预设，首先请选择一些声音。
        </p>
      )}
    </div>
  );
}
