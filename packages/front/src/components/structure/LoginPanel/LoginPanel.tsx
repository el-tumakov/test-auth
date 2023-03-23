import { useCallback, useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { EmailOutlined, KeyOutlined } from '@/components/basic/Icons';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import styles from './LoginPanel.module.css';
import Link from 'next/link';
import Logo from '@/components/basic/Logo';

const LoginPanel = () => {
  const errors = useRef<Record<string, string>>({});
  const [isShake, setShake] = useState(false);

  const validate = useCallback((values: Record<string, any>) => {
    const newErrors: Record<string, string> = {};

    if (!values.email || !isEmail(values.email)) {
      newErrors.email = 'Value has to be an email';
    }

    if (!values.password) {
      newErrors.password = 'Required';
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

  return (
    <section className={styles.wrap}>
      <Logo />
      <div className={styles.authWrap}>
        <h1>Log in to your account</h1>
        <Form name="form" onSubmit={(values) => console.log(values)} validate={validate}>
          <Field name="email">
            <Field.Text
              label="Email"
              type="email"
              placeholder="mail@example.com"
              autoComplete="username"
              prefixIcon={<EmailOutlined />}
            />
          </Field>
          <Field name="password">
            <Field.Password
              label="Password"
              autoComplete="new-password"
              prefixIcon={<KeyOutlined />}
            />
          </Field>
          <Button type="submit" fullWidth onClick={onClick} shake={isShake}>
            Login
          </Button>
          <p className={styles.registerDescription}>
            Don’t have an account yet? <Link href="/register">Register</Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default LoginPanel;
