import { useEffect, useState, useRef, useCallback } from 'react';

import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './isochornic.module.css';

interface IsochronicProps {
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

export function IsochronicModal({ onClose, show }: IsochronicProps) {
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default 10 Hz beat
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [waveform] = useState<OscillatorType>('sine'); // Default waveform
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('自定义');

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const beatGainRef = useRef<GainNode | null>(null);
  const modulatorRef = useRef<OscillatorNode | null>(null);

  const startSound = () => {
    if (isPlaying) return;

    audioContextRef.current = new window.AudioContext();
    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    // Main gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = volume;

    // Oscillator for the base tone
    oscillatorRef.current = audioContext.createOscillator();
    oscillatorRef.current.frequency.value = baseFrequency;
    oscillatorRef.current.type = waveform;

    // Gain node to create isochronic beats
    beatGainRef.current = audioContext.createGain();
    beatGainRef.current.gain.value = 0; // Start with silence

    // Oscillator for modulation
    modulatorRef.current = audioContext.createOscillator();
    modulatorRef.current.frequency.value = beatFrequency;
    modulatorRef.current.type = 'square'; // Square wave for on/off effect

    // Modulator gain to adjust modulation depth
    const modulatorGain = audioContext.createGain();
    modulatorGain.gain.value = 0.5; // Modulation depth

    // Connect modulator to the beat gain node
    modulatorRef.current
      .connect(modulatorGain)
      .connect(beatGainRef.current.gain);

    // Connect oscillator through beat gain and main gain to destination
    oscillatorRef.current
      .connect(beatGainRef.current)
      .connect(gainNodeRef.current)
      .connect(audioContext.destination);

    // Start oscillators
    oscillatorRef.current.start();
    modulatorRef.current.start();

    setIsPlaying(true);
  };

  const stopSound = useCallback(() => {
    if (!isPlaying) return;

    oscillatorRef.current?.stop();
    modulatorRef.current?.stop();
    audioContextRef.current?.close();

    setIsPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    // Update gain when volume changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Update base frequency when it changes
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = baseFrequency;
    }
  }, [baseFrequency]);

  useEffect(() => {
    // Update beat frequency when it changes
    if (modulatorRef.current) {
      modulatorRef.current.frequency.value = beatFrequency;
    }
  }, [beatFrequency]);

  useEffect(() => {
    // Update waveform when it changes
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
    }
  }, [waveform]);

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
        <h2 className={styles.title}>等距音</h2>
        <p className={styles.desc}>等距音生成器。</p>
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
                max="2000"
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
            音调频率 (Hz):
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
          {/* <div className={styles.fieldWrapper}>
            <label>
              Waveform:
              <select
                value={waveform}
                onChange={e => setWaveform(e.target.value as OscillatorType)}
              >
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
            </label>
          </div> */}
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
