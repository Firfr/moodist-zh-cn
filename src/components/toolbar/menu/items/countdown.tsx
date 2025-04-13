import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';

interface CountdownProps {
  open: () => void;
}

export function Countdown({ open }: CountdownProps) {
  return (
    <Item
      icon={<MdOutlineTimer />}
      label="倒计时"
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
