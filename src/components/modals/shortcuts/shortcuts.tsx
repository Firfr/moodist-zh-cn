import { Modal } from '@/components/modal';

import styles from './shortcuts.module.css';

interface ShortcutsModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShortcutsModal({ onClose, show }: ShortcutsModalProps) {
  const shortcuts = [
    {
      keys: ['Shift', 'H'],
      label: '快捷键列表',
    },
    {
      keys: ['Shift', 'Alt', 'P'],
      label: '预设',
    },
    {
      keys: ['Shift', 'S'],
      label: '分享声音',
    },
    {
      keys: ['Shift', 'N'],
      label: '便签',
    },
    {
      keys: ['Shift', 'P'],
      label: '番茄钟',
    },
    {
      keys: ['Shift', 'B'],
      label: '呼吸练习',
    },
    {
      keys: ['Shift', 'T'],
      label: '定时关闭',
    },
    {
      keys: ['Shift', 'Space'],
      label: '切换播放',
    },
    {
      keys: ['Shift', 'R'],
      label: '取消所有选择',
    },
  ];

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>快捷键</h1>
      <div className={styles.shortcuts}>
        {shortcuts.map(shortcut => (
          <Row
            key={shortcut.label}
            keys={shortcut.keys}
            label={shortcut.label}
          />
        ))}
      </div>
    </Modal>
  );
}

interface RowProps {
  keys: Array<string>;
  label: string;
}

function Row({ keys, label }: RowProps) {
  return (
    <div className={styles.row}>
      <p className={styles.label}>{label}</p>
      <div className={styles.divider} />
      <div className={styles.keys}>
        {keys.map(key => (
          <Key key={`${label}-${key}`}>{key}</Key>
        ))}
      </div>
    </div>
  );
}

interface KeyProps {
  children: React.ReactNode;
}

function Key({ children }: KeyProps) {
  return <div className={styles.key}>{children}</div>;
}
