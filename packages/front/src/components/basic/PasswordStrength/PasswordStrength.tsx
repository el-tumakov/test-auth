import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password?: string;
}

const getPasswordStregth = (password?: string) => {
  const correctPassword = /^(?=.*?[\p{L}])(?=.*?[\p{N}]).{8,}$/u;
  const withoutLetter = /^(?=.*?[\p{N}]).{8,}$/u;
  const withoutNumber = /^(?=.*?[\p{L}]).{8,}$/u;
  const tooShort = /^(?=.*?[\p{L}])(?=.*?[\p{N}]).{0,}$/u;

  if (!password) {
    return '';
  }

  if (correctPassword.test(password)) {
    return 'correct';
  }

  if (withoutLetter.test(password) || withoutNumber.test(password) || tooShort.test(password)) {
    return 'almost';
  }

  return 'weak';
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [passwordStregth, setPasswordStregth] = useState(getPasswordStregth(password));

  useEffect(() => {
    setPasswordStregth(getPasswordStregth(password));
  }, [password]);

  return (
    <div
      className={cn(styles.wrap, styles[passwordStregth])}
      title="Password strength meter"
      aria-live="polite"
    ></div>
  );
};

export default PasswordStrength;
