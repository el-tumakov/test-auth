import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputDescription.module.css';

interface InputLabelProps
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: React.ReactNode;
  isError?: boolean;
}

const InputDescription: React.FC<InputLabelProps> = ({
  className,
  children,
  isError = false,
  ...props
}) => {
  return (
    <span className={cn(styles.description, { [styles.isError]: isError }, className)} {...props}>
      {children}
    </span>
  );
};

export default InputDescription;
