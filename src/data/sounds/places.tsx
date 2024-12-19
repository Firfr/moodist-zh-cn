import {
  BiSolidCoffeeAlt,
  BiSolidPlaneAlt,
  BiSolidDryer,
} from 'react-icons/bi/index';
import { FaChurch, FaSubway, FaShoppingBasket } from 'react-icons/fa/index';
import { TbScubaMask, TbBeerFilled } from 'react-icons/tb/index';
import { GiVillage, GiCarousel } from 'react-icons/gi/index';
import {
  MdTempleBuddhist,
  MdConstruction,
  MdLocationPin,
} from 'react-icons/md/index';
import { HiOfficeBuilding } from 'react-icons/hi/index';
import { AiFillExperiment } from 'react-icons/ai/index';

import type { Category } from '../types';

export const places: Category = {
  icon: <MdLocationPin />,
  id: 'places',
  sounds: [
    {
      icon: <BiSolidCoffeeAlt />,
      id: 'cafe',
      label: '咖啡馆',
      src: '/sounds/places/cafe.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airport',
      label: '机场',
      src: '/sounds/places/airport.mp3',
    },
    {
      icon: <FaChurch />,
      id: 'church',
      label: '教堂',
      src: '/sounds/places/church.mp3',
    },
    {
      icon: <MdTempleBuddhist />,
      id: 'temple',
      label: '寺庙',
      src: '/sounds/places/temple.mp3',
    },
    {
      icon: <MdConstruction />,
      id: 'construction-site',
      label: '建筑工地',
      src: '/sounds/places/construction-site.mp3',
    },
    {
      icon: <TbScubaMask />,
      id: 'underwater',
      label: '水下',
      src: '/sounds/places/underwater.mp3',
    },
    {
      icon: <TbBeerFilled />,
      id: 'crowded-bar',
      label: '拥挤的酒吧',
      src: '/sounds/places/crowded-bar.mp3',
    },
    {
      icon: <GiVillage />,
      id: 'night-village',
      label: '夜间的村庄',
      src: '/sounds/places/night-village.mp3',
    },
    {
      icon: <FaSubway />,
      id: 'subway-station',
      label: '地铁站',
      src: '/sounds/places/subway-station.mp3',
    },
    {
      icon: <HiOfficeBuilding />,
      id: 'office',
      label: '办公室',
      src: '/sounds/places/office.mp3',
    },
    {
      icon: <FaShoppingBasket />,
      id: 'supermarket',
      label: '超市',
      src: '/sounds/places/supermarket.mp3',
    },
    {
      icon: <GiCarousel />,
      id: 'carousel',
      label: '旋转木马',
      src: '/sounds/places/carousel.mp3',
    },
    {
      icon: <AiFillExperiment />,
      id: 'laboratory',
      label: '实验室',
      src: '/sounds/places/laboratory.mp3',
    },
    {
      icon: <BiSolidDryer />,
      id: 'laundry-room',
      label: '洗衣房',
      src: '/sounds/places/laundry-room.mp3',
    },
  ],
  title: '环境音',
};
