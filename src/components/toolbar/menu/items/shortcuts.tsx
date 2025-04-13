import { MdKeyboardCommandKey } from 'react-icons/md/index';

import { Item } from '../item';

interface ShortcutsProps {
  open: () => void;
}

export function Shortcuts({ open }: ShortcutsProps) {
  return (
    <Item
      icon={<MdKeyboardCommandKey />}
      label="快捷键"
      shortcut="Shift + H"
      onClick={open}
    />
  );
}
