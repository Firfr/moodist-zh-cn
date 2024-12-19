import { IoMdFlower } from 'react-icons/io/index';

import { Item } from '../item';

interface BreathingExerciseProps {
  open: () => void;
}

export function BreathingExercise({ open }: BreathingExerciseProps) {
  return (
    <Item
      icon={<IoMdFlower />}
      label="呼吸练习"
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
