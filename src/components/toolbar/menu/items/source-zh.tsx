import { LuGithub } from 'react-icons/lu/index';

import { Item } from '../item';

export function Source() {
  return (
    <Item
      href="https://github.com/Firfr/moodist-zh-cn"
      icon={<LuGithub />}
      label="源代码-汉化"
    />
  );
}