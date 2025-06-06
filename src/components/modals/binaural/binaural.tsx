import { useEffect, useState, useRef, useCallback } from 'react';

import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './binaural.module.css';

interface BinauralProps {
  onClose: () => void;
  show: boolean;
}

interface Preset {
  baseFrequency: number;
  beatFrequency: number;
  name: string;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, name: 'δ波（深度睡眠） 2 Hz' },
  { baseFrequency: 100, beatFrequency: 5, name: 'θ波（冥想） 5 Hz' },
  { baseFrequency: 100, beatFrequency: 10, name: 'α波（放松） 10 Hz' },
  { baseFrequency: 100, beatFrequency: 20, name: 'β波（专注） 20 Hz' },
  { baseFrequency: 100, beatFrequency: 40, name: 'γ波（认知） 40 Hz' },
  { baseFrequency: 440, beatFrequency: 10, name: '自定义' },
];

function computeBinauralBeatOscillatorFrequencies(
  baseFrequency: number,
  beatFrequency: number,
) {
  return {
    leftFrequency: baseFrequency - beatFrequency / 2,
    rightFrequency: baseFrequency + beatFrequency / 2,
  };
}

export function BinauralModal({ onClose, show }: BinauralProps) {
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default to A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default to 10 Hz difference
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('自定义');

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = () => {
    if (isPlaying) return;

    // Initialize the AudioContext
    audioContextRef.current = new window.AudioContext();
    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    // Create a gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = volume; // Set volume based on state

    // Create oscillators for left and right channels
    leftOscillatorRef.current = audioContext.createOscillator();
    rightOscillatorRef.current = audioContext.createOscillator();

    if (
      !leftOscillatorRef.current ||
      !rightOscillatorRef.current ||
      !gainNodeRef.current
    )
      return;

    const { leftFrequency, rightFrequency } =
      computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
    leftOscillatorRef.current.frequency.value = leftFrequency;
    rightOscillatorRef.current.frequency.value = rightFrequency;

    // Pan oscillators to left and right
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1;

    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1;

    // Connect nodes
    leftOscillatorRef.current.connect(leftPanner).connect(gainNodeRef.current);
    rightOscillatorRef.current
      .connect(rightPanner)
      .connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);

    // Start oscillators
    leftOscillatorRef.current.start();
    rightOscillatorRef.current.start();

    setIsPlaying(true);
  };

  const stopSound = useCallback(() => {
    if (!isPlaying) return;

    leftOscillatorRef.current?.stop();
    rightOscillatorRef.current?.stop();
    audioContextRef.current?.close();

    setIsPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    // Update gain node when volume changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Update base frequency for both left and right oscillators when it changes
    if (leftOscillatorRef.current && rightOscillatorRef.current) {
      const { leftFrequency, rightFrequency } =
        computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
      leftOscillatorRef.current.frequency.value = leftFrequency;
      rightOscillatorRef.current.frequency.value = rightFrequency;
    }
  }, [baseFrequency, beatFrequency]);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      if (isPlaying) {
        stopSound();
      }
    };
  }, [isPlaying, stopSound]);

  useEffect(() => {
    // Update frequencies when a preset is selected
    if (selectedPreset !== '自定义') {
      const preset = presets.find(p => p.name === selectedPreset);
      if (preset) {
        setBaseFrequency(preset.baseFrequency);
        setBeatFrequency(preset.beatFrequency);
      }
    }
  }, [selectedPreset]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedPreset(selected);

    if (selected === '自定义') {
      // Allow user to input custom frequencies
      return;
    }

    const preset = presets.find(p => p.name === selected);
    if (preset) {
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>双耳拍频</h2>
        <p className={styles.desc}>双耳拍频生成器。</p>
      </header>

      <div className={styles.fieldWrapper}>
        <label>
        预设:
          <select value={selectedPreset} onChange={handlePresetChange}>
            {presets.map(preset => (
              <option key={preset.name} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedPreset === '自定义' && (
        <>
          <div className={styles.fieldWrapper}>
            <label>
            基础频率 (Hz):
              <input
                max="1500"
                min="20"
                step="0.1"
                type="number"
                value={baseFrequency}
                onChange={e =>
                  setBaseFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
          <div className={styles.fieldWrapper}>
            <label>
            拍频 (Hz):
              <input
                max="40"
                min="0.1"
                step="0.1"
                type="number"
                value={beatFrequency}
                onChange={e =>
                  setBeatFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
        </>
      )}
      <div className={styles.fieldWrapper}>
        <label>
        音量调节:
          <Slider
            className={styles.volume}
            max={1}
            min={0}
            step={0.01}
            value={volume}
            onChange={value => setVolume(value)}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.primary}
          disabled={isPlaying}
          onClick={startSound}
        >
          开始
        </button>
        <button disabled={!isPlaying} onClick={stopSound}>
        停止
        </button>
      </div>
    </Modal>
  );
}
