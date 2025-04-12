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

      <div className={styles.title}>
        <span>支持我(原作者)</span>
      </div>
      <p className={styles.desc}>帮助我保持Moodist无广告。<br/>这是这个项目原作者的捐赠链接。<br/>如有余力，请不吝支持，赠人玫瑰手有余香。</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        今日捐赠
      </SpecialButton>
    </div>
  );
}
