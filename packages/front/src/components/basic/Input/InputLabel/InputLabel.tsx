import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './InputLabel.module.css';

interface InputLabelProps
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: React.ReactNode;
}

const InputLabel: React.FC<InputLabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={cn(styles.label, className)} {...props}>
      {children}
    </label>
  );
};

export default InputLabel;
