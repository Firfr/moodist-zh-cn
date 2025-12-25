#!/bin/bash

echo "写入汉化仓库地址"
cat <<EOF > ./代码/src/components/toolbar/menu/items/source-zh.tsx
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

EOF

echo "引用"
echo -e "export { Source as SourceItemZh } from './source-zh';" >> 代码/src/components/toolbar/menu/items/index.ts
echo ""

echo "写入赞助链接"
cat <<EOF > ./代码/src/components/toolbar/menu/items/donate-zh.tsx
import { SiBuymeacoffee } from 'react-icons/si/index';

import { Item } from '../item';

export function Donate() {
  return (
    <Item
      href="https://gitee.com/firfe/me"
      icon={<SiBuymeacoffee />}
      label="打赏汉化者"
    />
  );
}

EOF

echo "引用"
echo -e "export { Donate as DonateZH } from './donate-zh';" >> 代码/src/components/toolbar/menu/items/index.ts
echo ""
