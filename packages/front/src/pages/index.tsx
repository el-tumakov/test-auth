import { useCallback, useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import MainLayout from '@/components/layout/MainLayout';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import Button from '@/components/basic/Button';
import { EmailOutlined, KeyOutlined } from '@/components/basic/Icons';

export default function Home() {
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
    <MainLayout title="Authorization">
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
            description="Please, input password"
            autoComplete="new-password"
            prefixIcon={<KeyOutlined />}
          />
        </Field>
        <Button type="submit" fullWidth onClick={onClick} shake={isShake} disabled>
          Submit
        </Button>
      </Form>
    </MainLayout>
  );
}
