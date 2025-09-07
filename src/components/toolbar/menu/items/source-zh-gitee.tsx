import { LuGithub } from 'react-icons/lu/index';

import { Item } from '../item';

export function Source() {
  return (
    <Item
      href="https://gitee.com/firfe/moodist-zh-cn"
      icon={<LuGithub />}
      label="源代码-汉化-Gitee"
    />
  );
}