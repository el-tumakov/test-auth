import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';
import { BadgeOutlined, EmailOutlined, KeyOutlined } from '@/components/basic/Icons';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import styles from './RegisterPanel.module.css';
import PasswordStrength from '@/components/basic/PasswordStrength';
import { useStore } from '@/store';

const RegisterPanel = () => {
  const errors = useRef<Record<string, string>>({});
  const { userEmail, setUserEmail } = useStore();
  const [isShake, setShake] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>();

  const validate = useCallback((values: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    const correctPassword = /^(?=.*?[\p{L}])(?=.*?[\p{N}]).{8,}$/u;

    if (!values.email || !isEmail(values.email)) {
      newErrors.email = 'Value has to be an email';
    }

    if (!values.password || !correctPassword.test(values.password)) {
      newErrors.password = 'Minimum 8 characters, 1 letter and 1 number';
    }

    errors.current = newErrors;

    return newErrors;
  }, []);

  const onClick = useCallback(() => {
    if (Object.keys(errors.current).length) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }, []);

  const onPasswordFocus = useCallback(() => {
    setPasswordFocus(true);
  }, []);

  const onPasswordBlur = useCallback(() => {
    setPasswordFocus(false);
  }, []);

  return (
    <>
      <h1>Register a new account</h1>
      <Form
        name="form"
        onSubmit={(values) => console.log(values)}
        validate={validate}
        initialValues={{ email: userEmail }}
      >
        <Field name="email" onChange={setUserEmail}>
          <Field.Text
            label="Email"
            type="email"
            placeholder="mail@example.com"
            autoComplete="username"
            prefixIcon={<EmailOutlined />}
          />
        </Field>
        <Field name="name">
          <Field.Text
            label="Name (optional)"
            placeholder="John Snow"
            autoComplete="name"
            prefixIcon={<BadgeOutlined />}
          />
        </Field>
        <Field
          name="password"
          onChange={setPasswordValue}
          onFocus={onPasswordFocus}
          onBlur={onPasswordBlur}
        >
          <Field.Password
            label="Password"
            autoComplete="new-password"
            prefixIcon={<KeyOutlined />}
            description="Minimum 8 characters, 1 letter and 1 number"
          />
          {isPasswordFocus ? <PasswordStrength password={passwordValue} /> : null}
        </Field>
        <Button type="submit" fullWidth onClick={onClick} shake={isShake}>
          Create a new account
        </Button>
        <p className={styles.registerDescription}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </Form>
    </>
  );
};

export default RegisterPanel;
