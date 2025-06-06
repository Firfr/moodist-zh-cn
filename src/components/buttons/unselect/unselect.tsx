import { useCallback } from 'react';
import { BiUndo, BiTrash } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';

import { Tooltip } from '@/components/tooltip';

import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { fade, mix, slideX } from '@/lib/motion';

import styles from './unselect.module.css';

export function UnselectButton() {
  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);
  const locked = useSoundStore(state => state.locked);

  const variants = {
    ...mix(fade(), slideX(15)),
    exit: { opacity: 0 },
  };

  const handleToggle = useCallback(() => {
    if (locked) return;
    if (hasHistory) restoreHistory();
    else if (!noSelected) unselectAll(true);
  }, [hasHistory, noSelected, unselectAll, restoreHistory, locked]);

  useHotkeys('shift+r', handleToggle, {}, [handleToggle]);

  return (
    <>
      <AnimatePresence mode="wait">
        {(!noSelected || hasHistory) && (
          <motion.div
            animate="show"
            exit="exit"
            initial="hidden"
            variants={variants}
          >
            <Tooltip
              showDelay={0}
              content={
                hasHistory
                  ? '恢复未选择的声音。'
                  : '取消选择所有声音。'
              }
            >
              <button
                disabled={noSelected && !hasHistory}
                aria-label={
                  hasHistory
                    ? 'Restore Unselected Sounds'
                    : 'Unselect All Sounds'
                }
                className={cn(
                  styles.unselectButton,
                  noSelected && !hasHistory && styles.disabled,
                )}
                onClick={handleToggle}
              >
                {hasHistory ? <BiUndo /> : <BiTrash />}
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
