import { FaHeadphonesAlt } from 'react-icons/fa/index';

import { Item } from '../item';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  return (
    <Item icon={<FaHeadphonesAlt />} label="双耳拍频" onClick={open} />
  );
}
