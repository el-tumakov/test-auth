import { Dispatch, SetStateAction } from 'react';

export const shake = (setShake: Dispatch<SetStateAction<boolean>>) => {
  setShake(true);
  setTimeout(() => setShake(false), 300);
};
