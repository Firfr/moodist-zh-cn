import { useCallback, useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';
import { useHotkeys } from 'react-hotkeys-hook';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function PlayButton() {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const showSnackbar = useSnackbar();

  const handleToggle = useCallback(() => {
    if (locked) return;

    if (noSelected) return showSnackbar('请先选择要播放的声音。');

    toggle();
  }, [showSnackbar, toggle, noSelected, locked]);

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  useHotkeys('shift+space', handleToggle, {}, [handleToggle]);

  return (
    <button
      aria-disabled={noSelected}
      className={cn(styles.playButton, noSelected && styles.disabled)}
      onClick={handleToggle}
    >
      {isPlaying ? (
        <>
          <span aria-hidden="true">
            <BiPause />
          </span>{' '}
          暂停
        </>
      ) : (
        <>
          <span aria-hidden="true">
            <BiPlay />
          </span>{' '}
          播放
        </>
      )}
    </button>
  );
}
