import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputDescription.module.css';

interface InputLabelProps
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: React.ReactNode;
}

const InputDescription: React.FC<InputLabelProps> = ({ className, children, ...props }) => {
  return (
    <span className={cn(styles.description, className)} {...props}>
      {children}
    </span>
  );
};

export default InputDescription;
