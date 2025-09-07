import { MdTaskAlt } from 'react-icons/md/index';

import { Item } from '../item';

interface TodoProps {
  open: () => void;
}

export function Todo({ open }: TodoProps) {
  return (
    <Item
      icon={<MdTaskAlt />}
      label="待办清单"
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
