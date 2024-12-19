import { FaCoffee } from 'react-icons/fa/index';

import { SpecialButton } from '@/components/special-button';

import styles from './donate.module.css';

export function Donate() {
  return (
    <div className={styles.donate}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div aria-hidden="true" className={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <div className={styles.title}>支持我(原作者)</div>
      <p className={styles.desc}>帮助我保持Moodist无广告。<br/>(这是这个项目原作者的捐赠链接,不是翻译者我的)</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        今日捐赠
      </SpecialButton>
    </div>
  );
}
