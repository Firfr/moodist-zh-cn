import { TbWaveSine } from 'react-icons/tb/index';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

export const binaural: Category = {
  icon: <TbWaveSine />,
  id: 'binaural',
  sounds: [
    {
      icon: <BsSoundwave />,
      id: 'binaural-delta',
      label: '德尔塔波(0.5–4Hz)',
      src: '/sounds/binaural/binaural-delta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-theta',
      label: '西塔波(4–8Hz)',
      src: '/sounds/binaural/binaural-theta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-alpha',
      label: '阿尔法波(8–12Hz)',
      src: '/sounds/binaural/binaural-alpha.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-beta',
      label: '贝塔波(12–30Hz)',
      src: '/sounds/binaural/binaural-beta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-gamma',
      label: '伽马波(30Hz以上)',
      src: '/sounds/binaural/binaural-gamma.wav',
    },
  ],
  title: '双耳节拍',
};
