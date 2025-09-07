import { FaHeadphonesAlt } from 'react-icons/fa/index';

import { Item } from '../item';

interface LofiProps {
  open: () => void;
}

export function Lofi({ open }: LofiProps) {
  return <Item icon={<FaHeadphonesAlt />} label="低保真音乐(需联网)" onClick={open} />;
}
