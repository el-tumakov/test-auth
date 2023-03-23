import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  fullWidth?: boolean;
  shake?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  fullWidth = false,
  shake = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.fullWidth]: fullWidth,
          [styles.shake]: shake,
        },
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
