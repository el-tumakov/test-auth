import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputBase.module.css';

export interface InputBaseProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isError?: boolean;
}

const InputBase: React.FC<InputBaseProps> = ({ className, isError = false, ...props }) => {
  return (
    <div className={cn(styles.wrap, { [styles.isError]: isError }, className)}>
      <input className={styles.input} type="text" {...props} />
    </div>
  );
};

export default InputBase;
