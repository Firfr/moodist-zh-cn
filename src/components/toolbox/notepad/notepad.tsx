import { useRef, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi/index';
import { LuCopy, LuDownload } from 'react-icons/lu/index';
import { FaCheck } from 'react-icons/fa6/index';
import { FaUndo } from 'react-icons/fa/index';

import { Modal } from '@/components/modal';
import { Button } from './button';

import { useNoteStore } from '@/stores/note';
import { useCopy } from '@/hooks/use-copy';
import { download } from '@/helpers/download';

import styles from './notepad.module.css';

interface NotepadProps {
  onClose: () => void;
  show: boolean;
}

export function Notepad({ onClose, show }: NotepadProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const note = useNoteStore(state => state.note);
  const history = useNoteStore(state => state.history);
  const write = useNoteStore(state => state.write);
  const words = useNoteStore(state => state.words());
  const characters = useNoteStore(state => state.characters());
  const clear = useNoteStore(state => state.clear);
  const restore = useNoteStore(state => state.restore);

  const { copy, copying } = useCopy();

  useEffect(() => {
    if (show && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    }
  }, [show]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if (e.key === 'Escape') onClose();
  };

  return (
    <Modal show={show} wide onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.label}>您的笔记</h2>
        <div className={styles.buttons}>
          <Button
            icon={copying ? <FaCheck /> : <LuCopy />}
            tooltip="复制笔记"
            onClick={() => copy(note)}
          />
          <Button
            icon={<LuDownload />}
            tooltip="下载笔记"
            onClick={() => download('Moodit笔记.txt', note)}
          />
          <Button
            critical={!history}
            icon={history ? <FaUndo /> : <BiTrash />}
            recommended={!!history}
            tooltip={history ? '恢复笔记' : '清除笔记'}
            onClick={() => (history ? restore() : clear())}
          />
        </div>
      </header>

      <textarea
        className={styles.textarea}
        dir="auto"
        placeholder="开始记录您的想法、灵感或待办事项。"
        ref={textareaRef}
        spellCheck={false}
        value={note}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <p className={styles.counter}>
        {characters} 字符{characters !== 1 && ''} • {words} 词组
        {words !== 1 && ''}
      </p>
    </Modal>
  );
}
