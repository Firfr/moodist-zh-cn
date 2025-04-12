import { GiWaterfall, GiStonePile } from 'react-icons/gi/index';
import { BsFire, BsFillDropletFill } from 'react-icons/bs/index';
import { BiSolidTree, BiWater } from 'react-icons/bi/index';
import {
  FaWater,
  FaWind,
  FaLeaf,
  FaRegSnowflake,
  FaTree,
} from 'react-icons/fa/index';

import type { Category } from '../types';

export const nature: Category = {
  icon: <BiSolidTree />,
  id: 'nature',
  sounds: [
    {
      icon: <BiWater />,
      id: 'river',
      label: '溪流',
      src: '/sounds/nature/river.mp3',
    },
    {
      icon: <FaWater />,
      id: 'waves',
      label: '海浪',
      src: '/sounds/nature/waves.mp3',
    },
    {
      icon: <BsFire />,
      id: 'campfire',
      label: '篝火',
      src: '/sounds/nature/campfire.mp3',
    },
    {
      icon: <FaWind />,
      id: 'wind',
      label: '风',
      src: '/sounds/nature/wind.mp3',
    },
    {
      icon: <FaWind />,
      id: 'howling-wind',
      label: '呼啸的风',
      src: '/sounds/nature/howling-wind.mp3',
    },
    {
      icon: <BiSolidTree />,
      id: 'wind-in-trees',
      label: '风中的树叶',
      src: '/sounds/nature/wind-in-trees.mp3',
    },
    {
      icon: <GiWaterfall />,
      id: 'waterfall',
      label: '瀑布',
      src: '/sounds/nature/waterfall.mp3',
    },
    {
      icon: <FaRegSnowflake />,
      id: 'walk-in-snow',
      label: '雪地行走',
      src: '/sounds/nature/walk-in-snow.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'walk-on-leaves',
      label: '走在落叶上',
      src: '/sounds/nature/walk-on-leaves.mp3',
    },
    {
      icon: <GiStonePile />,
      id: 'walk-on-gravel',
      label: '碎石上行走',
      src: '/sounds/nature/walk-on-gravel.mp3',
    },
    {
      icon: <BsFillDropletFill />,
      id: 'droplets',
      label: '水滴',
      src: '/sounds/nature/droplets.mp3',
    },
    {
      icon: <FaTree />,
      id: 'jungle',
      label: '丛林',
      src: '/sounds/nature/jungle.mp3',
    },
  ],
  title: '自然之声',
};
