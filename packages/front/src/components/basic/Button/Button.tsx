import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import { SpinnerOutlined } from '../Icons';
import styles from './Button.module.css';

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  fullWidth?: boolean;
  shake?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  fullWidth = false,
  shake = false,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.fullWidth]: fullWidth,
          [styles.shake]: shake,
          [styles.loading]: loading,
        },
        className
      )}
      type="button"
      disabled={loading}
      aria-busy={loading ? 'true' : 'false'}
      aria-live="polite"
      {...props}
    >
      {children}
      {loading ? <SpinnerOutlined className={styles.spinner} role="status" /> : null}
    </button>
  );
};

export default Button;
