import { Modal } from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

import styles from './todo.module.css';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>待办事项清单</h2>
        <p className={styles.desc}>超级简单的待办事项清单。</p>
      </header>

      <Form />
      <Todos />
    </Modal>
  );
}
