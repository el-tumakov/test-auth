import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';
import { EmailOutlined } from '@/components/basic/Icons';
import { useStore } from '@/store';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import styles from './RecoveryPanel.module.css';

const RecoveryPanel = () => {
  const errors = useRef<Record<string, string>>({});
  const [isShake, setShake] = useState(false);
  const { userEmail, setUserEmail } = useStore();

  const validate = useCallback((values: Record<string, any>) => {
    const newErrors: Record<string, string> = {};

    if (!values.email || !isEmail(values.email)) {
      newErrors.email = 'Value has to be an email';
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
    <>
      <h1>Password recovery</h1>
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
        <Button type="submit" fullWidth onClick={onClick} shake={isShake}>
          Send code
        </Button>
        <p className={styles.registerDescription}>
          Remembered your password? <Link href="/login">Login</Link>
        </p>
        <p className={styles.registerDescription}>
          Don’t have an account yet? <Link href="/register">Register</Link>
        </p>
      </Form>
    </>
  );
};

export default RecoveryPanel;
