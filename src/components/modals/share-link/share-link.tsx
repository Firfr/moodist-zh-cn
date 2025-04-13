import { useMemo, useEffect, useState } from 'react';
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5/index';

import { Modal } from '@/components/modal';

import { useCopy } from '@/hooks/use-copy';
import { useSoundStore } from '@/stores/sound';

import styles from './share-link.module.css';

interface ShareLinkModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShareLinkModal({ onClose, show }: ShareLinkModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const sounds = useSoundStore(state => state.sounds);
  const { copy, copying } = useCopy();

  const selected = useMemo(() => {
    return Object.keys(sounds)
      .map(sound => ({
        id: sound,
        isSelected: sounds[sound].isSelected,
        volume: sounds[sound].volume.toFixed(2),
      }))
      .filter(sound => sound.isSelected);
  }, [sounds, JSON.stringify(sounds)]); // eslint-disable-line

  const string = useMemo(() => {
    const object: Record<string, number> = {};

    selected.forEach(sound => {
      object[sound.id] = Number(sound.volume);
    });

    return JSON.stringify(object);
  }, [selected]);

  const url = useMemo(() => {
    if (!isMounted)
      return `https://moodist.app/?share=${encodeURIComponent(string)}`;

    return `${window.location.protocol}//${
      window.location.host
    }/?share=${encodeURIComponent(string)}`;
  }, [string, isMounted]);

  useEffect(() => setIsMounted(true), []);

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>分享您的声音组合！</h1>
      <p className={styles.desc}>
        复制并发送以下链接给想要分享声音选择的人。
        <br />下方右侧复制按钮仅HTTPS协议可用！
      </p>
      <div className={styles.inputWrapper}>
        <input readOnly type="text" value={url} />
        <button onClick={() => copy(url)}>
          {copying ? <IoCheckmark /> : <IoCopyOutline />}
        </button>
      </div>
    </Modal>
  );
}
