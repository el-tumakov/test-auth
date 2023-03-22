import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputBase.module.css';

export interface InputBaseProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const InputBase: React.FC<InputBaseProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.wrap, className)}>
      <input className={styles.input} type="text" {...props} />
    </div>
  );
};

export default InputBase;
