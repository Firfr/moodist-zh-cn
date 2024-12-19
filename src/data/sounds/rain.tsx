import {
  BsFillCloudRainFill,
  BsFillCloudRainHeavyFill,
  BsUmbrellaFill,
} from 'react-icons/bs/index';
import { GiWindow } from 'react-icons/gi/index';
import { FaLeaf } from 'react-icons/fa/index';
import { PiTentFill } from 'react-icons/pi/index';
import { MdOutlineThunderstorm } from 'react-icons/md/index';

import type { Category } from '../types';

export const rain: Category = {
  icon: <BsFillCloudRainFill />,
  id: 'rain',
  sounds: [
    {
      icon: <BsFillCloudRainFill />,
      id: 'light-rain',
      label: '小雨',
      src: '/sounds/rain/light-rain.mp3',
    },
    {
      icon: <BsFillCloudRainHeavyFill />,
      id: 'heavy-rain',
      label: '大雨',
      src: '/sounds/rain/heavy-rain.mp3',
    },
    {
      icon: <MdOutlineThunderstorm />,
      id: 'thunder',
      label: '雷声',
      src: '/sounds/rain/thunder.mp3',
    },
    {
      icon: <GiWindow />,
      id: 'rain-on-window',
      label: '雨打窗户',
      src: '/sounds/rain/rain-on-window.mp3',
    },
    {
      icon: <BsUmbrellaFill />,
      id: 'rain-on-umbrella',
      label: '伞上的雨声',
      src: '/sounds/rain/rain-on-umbrella.mp3',
    },
    {
      icon: <PiTentFill />,
      id: 'rain-on-tent',
      label: '雨打帐篷',
      src: '/sounds/rain/rain-on-tent.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'rain-on-leaves',
      label: '雨打树叶',
      src: '/sounds/rain/rain-on-leaves.mp3',
    },
  ],
  title: '各种雨声',
};
