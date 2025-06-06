import { IoMoonSharp } from 'react-icons/io5/index';

import { useSleepTimerStore } from '@/stores/sleep-timer';
import { Item } from '../item';

interface SleepTimerProps {
  open: () => void;
}

export function SleepTimer({ open }: SleepTimerProps) {
  const active = useSleepTimerStore(state => state.active);

  return (
    <Item
      active={active}
      icon={<IoMoonSharp />}
      label="定时关闭"
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
