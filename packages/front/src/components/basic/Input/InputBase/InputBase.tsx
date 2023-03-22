import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputBase.module.css';

export interface InputBaseProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isError?: boolean;
  suffixIcon?: React.ReactElement;
}

const InputBase: React.FC<InputBaseProps> = ({
  className,
  isError = false,
  suffixIcon = null,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.wrap,
        {
          [styles.isError]: isError,
        },
        className
      )}
    >
      <input
        className={cn(styles.input, {
          [styles.inputWithSuffixIcon]: !!suffixIcon,
        })}
        type="text"
        {...props}
      />
      {suffixIcon ? <span className={styles.suffixIcon}>{suffixIcon}</span> : null}
    </div>
  );
};

export default InputBase;
