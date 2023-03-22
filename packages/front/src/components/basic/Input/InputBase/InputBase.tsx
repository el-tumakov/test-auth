import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './InputBase.module.css';

export interface InputBaseProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isError?: boolean;
  prefixIcon?: React.ReactElement;
  suffixIcon?: React.ReactElement;
}

const InputBase: React.FC<InputBaseProps> = ({
  className,
  isError = false,
  prefixIcon = null,
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
      {prefixIcon ? <span className={cn(styles.icon, styles.prefixIcon)}>{prefixIcon}</span> : null}
      <input
        className={cn(styles.input, {
          [styles.inputWithPrefixIcon]: !!prefixIcon,
          [styles.inputWithSuffixIcon]: !!suffixIcon,
        })}
        type="text"
        {...props}
      />
      {suffixIcon ? <span className={cn(styles.icon, styles.suffixIcon)}>{suffixIcon}</span> : null}
    </div>
  );
};

export default InputBase;
