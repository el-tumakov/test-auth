import { useCallback, useMemo, useState } from 'react';
import { VisabilityOff, VisabilityOn } from '../../Icons';
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
        <button className={styles.iconButton} aria-label="Hide password.">
          <VisabilityOff onClick={onSuffixClick} />
        </button>
      );
    }

    return (
      <button
        className={styles.iconButton}
        aria-label="Show password as plain text. Warning: this will display your password on the screen."
      >
        <VisabilityOn onClick={onSuffixClick} />
      </button>
    );
  }, [isVisible, onSuffixClick]);

  const type = useMemo(() => {
    return isVisible ? 'text' : 'password';
  }, [isVisible]);

  return <InputBase suffixIcon={suffixIcon} type={type} {...props} />;
};

export default InputPassword;
