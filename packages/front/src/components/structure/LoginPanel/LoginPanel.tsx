import { useCallback, useState } from 'react';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';
import { EmailOutlined, KeyOutlined } from '@/components/basic/Icons';
import { useStore } from '@/store';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import { signin } from '@/actions/auth';
import { shake } from '@/utils';
import styles from './LoginPanel.module.css';

const LoginPanel = () => {
  const [isShake, setShake] = useState(false);
  const { userEmail, setUserEmail } = useStore();

  const onSubmit = useCallback(async (values: any) => {
    const errors: Record<string, string> = {};
    let isError = false;

    if (!values.email || !isEmail(values.email)) {
      isError = true;
      errors.email = 'Value has to be an email';
    }

    if (!values.password) {
      isError = true;
      errors.password = 'Password is required';
    }

    if (isError) {
      shake(setShake);

      return errors;
    }

    return signin(values).catch((err) => {
      if (err?.cause?.statusCode === 401) {
        shake(setShake);

        return { password: err.cause.message };
      }
    });
  }, []);

  return (
    <>
      <h1>Log in to your account</h1>
      <Form name="form" onSubmit={onSubmit} initialValues={{ email: userEmail }}>
        <Field name="email" onChange={setUserEmail}>
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
            autoComplete="current-password"
            prefixIcon={<KeyOutlined />}
          />
        </Field>
        <div className={styles.recoveryWrap}>
          <Field name="isRemember" type="checkbox" noMargin>
            <Field.Checkbox>Remember me</Field.Checkbox>
          </Field>
          <Link href="/recovery">Forgot password?</Link>
        </div>
        <Button type="submit" shake={isShake} fullWidth>
          Login
        </Button>
        <p className={styles.registerDescription}>
          Don’t have an account yet? <Link href="/register">Register</Link>
        </p>
      </Form>
    </>
  );
};

export default LoginPanel;
