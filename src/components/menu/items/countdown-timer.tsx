import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';

export function CountdownTimer() {
  return (
    <Item
      href="https://timesy.app"
      icon={<MdOutlineTimer />}
      label="倒计时"
    />
  );
}
