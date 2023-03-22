import { useCallback, useMemo, useState } from 'react';
import { VisabilityOffOutlined, VisabilityOnOutlined } from '../../Icons';
import InputBase, { InputBaseProps } from '../InputBase';
import styles from './InputPassword.module.css';

export interface InputPasswordProps extends InputBaseProps {
  visability?: boolean;
}

const InputPassword: React.FC<InputPasswordProps> = ({ visability = false, ...props }) => {
  const [isVisible, setVisible] = useState(visability);

  const onSuffixClick = useCallback(() => {
    setVisible(!isVisible);
  }, [isVisible]);

  const suffixIcon = useMemo(() => {
    if (isVisible) {
      return (
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Hide password."
          onClick={onSuffixClick}
        >
          <VisabilityOffOutlined />
        </button>
      );
    }

    return (
      <button
        className={styles.iconButton}
        type="button"
        aria-label="Show password as plain text. Warning: this will display your password on the screen."
        onClick={onSuffixClick}
      >
        <VisabilityOnOutlined />
      </button>
    );
  }, [isVisible, onSuffixClick]);

  const type = useMemo(() => {
    return isVisible ? 'text' : 'password';
  }, [isVisible]);

  return <InputBase suffixIcon={suffixIcon} type={type} {...props} />;
};

export default InputPassword;
