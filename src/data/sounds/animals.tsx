import {
  GiCricket,
  GiSeagull,
  GiWolfHead,
  GiOwl,
  GiWhaleTail,
  GiTreeBeehive,
  GiEgyptianBird,
  GiChicken,
  GiCow,
  GiSheep,
} from 'react-icons/gi/index';
import {
  FaDog,
  FaFrog,
  FaHorseHead,
  FaCat,
  FaCrow,
} from 'react-icons/fa/index';
import { PiBirdFill, PiDogBold } from 'react-icons/pi/index';

import type { Category } from '../types';

export const animals: Category = {
  icon: <FaDog />,
  id: 'animals',
  sounds: [
    {
      icon: <PiBirdFill />,
      id: 'birds',
      label: '鸟鸣',
      src: '/sounds/animals/birds.mp3',
    },
    {
      icon: <GiSeagull />,
      id: 'seagulls',
      label: '海鸥',
      src: '/sounds/animals/seagulls.mp3',
    },
    {
      icon: <GiCricket />,
      id: 'crickets',
      label: '蟋蟀',
      src: '/sounds/animals/crickets.mp3',
    },
    {
      icon: <GiWolfHead />,
      id: 'wolf',
      label: '狼嚎',
      src: '/sounds/animals/wolf.mp3',
    },
    {
      icon: <GiOwl />,
      id: 'owl',
      label: '猫头鹰',
      src: '/sounds/animals/owl.mp3',
    },
    {
      icon: <FaFrog />,
      id: 'frog',
      label: '青蛙',
      src: '/sounds/animals/frog.mp3',
    },
    {
      icon: <PiDogBold />,
      id: 'dog-barking',
      label: '犬吠',
      src: '/sounds/animals/dog-barking.mp3',
    },
    {
      icon: <FaHorseHead />,
      id: 'horse-galopp',
      label: '马蹄',
      src: '/sounds/animals/horse-galopp.mp3',
    },
    {
      icon: <FaCat />,
      id: 'cat-purring',
      label: '猫的呼噜',
      src: '/sounds/animals/cat-purring.mp3',
    },
    {
      icon: <FaCrow />,
      id: 'crows',
      label: '鸦啼',
      src: '/sounds/animals/crows.mp3',
    },
    {
      icon: <GiWhaleTail />,
      id: 'whale',
      label: '鲸鱼',
      src: '/sounds/animals/whale.mp3',
    },
    {
      icon: <GiTreeBeehive />,
      id: 'beehive',
      label: '蜂群',
      src: '/sounds/animals/beehive.mp3',
    },
    {
      icon: <GiEgyptianBird />,
      id: 'woodpecker',
      label: '啄木鸟',
      src: '/sounds/animals/woodpecker.mp3',
    },
    {
      icon: <GiChicken />,
      id: 'chickens',
      label: '鸡群',
      src: '/sounds/animals/chickens.mp3',
    },
    {
      icon: <GiCow />,
      id: 'cows',
      label: '牛叫',
      src: '/sounds/animals/cows.mp3',
    },
    {
      icon: <GiSheep />,
      id: 'sheep',
      label: '羊群',
      src: '/sounds/animals/sheep.mp3',
    },
  ],
  title: '动物之音',
};
