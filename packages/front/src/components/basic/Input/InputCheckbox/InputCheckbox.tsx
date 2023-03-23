import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './InputCheckbox.module.css';

export interface InputCheckboxProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelPlacement?: 'left' | 'right';
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  className,
  children,
  labelPlacement = 'right',
  ...props
}) => {
  return (
    <label className={styles.wrap}>
      <span className={cn(styles.label, styles[labelPlacement])}>{children}</span>
      <input className={cn(styles.checkbox, className)} {...props} type="checkbox" />
    </label>
  );
};

export default InputCheckbox;
