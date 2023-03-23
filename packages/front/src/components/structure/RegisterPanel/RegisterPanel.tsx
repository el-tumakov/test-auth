import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import isEmail from 'validator/lib/isEmail';
import { BadgeOutlined, EmailOutlined, KeyOutlined } from '@/components/basic/Icons';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import PasswordStrength from '@/components/basic/PasswordStrength';
import { useStore } from '@/store';
import { signup } from '@/actions/auth';
import { shake } from '@/utils';
import styles from './RegisterPanel.module.css';

const RegisterPanel = () => {
  const router = useRouter();
  const { userEmail, setUserEmail } = useStore();
  const [isShake, setShake] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>();

  const onPasswordFocus = useCallback(() => {
    setPasswordFocus(true);
  }, []);

  const onPasswordBlur = useCallback(() => {
    setPasswordFocus(false);
  }, []);

  const onSubmit = useCallback(
    async (values: any) => {
      const errors: Record<string, string> = {};
      const correctPassword = /^(?=.*?[\p{L}])(?=.*?[\p{N}]).{8,}$/u;
      let isError = false;

      if (!values.email || !isEmail(values.email)) {
        isError = true;
        errors.email = 'Value has to be an email';
      }

      if (!values.password || !correctPassword.test(values.password)) {
        isError = true;
        errors.password = 'Minimum 8 characters, 1 letter and 1 number';
      }

      if (isError) {
        shake(setShake);

        return errors;
      }

      return signup(values)
        .then((response) => {
          setCookie('tumakov.testauth.token', response.token);
          router.push('/');
        })
        .catch((err) => {
          if (err?.cause?.error) {
            shake(setShake);

            return err.cause.error;
          }
        });
    },
    [router]
  );

  return (
    <>
      <h1>Register a new account</h1>
      <Form name="form" onSubmit={onSubmit}>
        <Field name="email" onChange={(value) => setUserEmail(value)} initialValue={userEmail}>
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
        <Button type="submit" shake={isShake} fullWidth>
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
