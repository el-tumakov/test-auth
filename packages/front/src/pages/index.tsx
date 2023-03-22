import isEmail from 'validator/lib/isEmail';
import MainLayout from '@/components/layout/MainLayout';
import Form from '@/components/basic/Form';
import Field from '@/components/basic/Field';
import { EmailOutlined, KeyOutlined } from '@/components/basic/Icons';

export default function Home() {
  return (
    <MainLayout title="Authorization">
      <Form
        name="form"
        onSubmit={() => console.log('submit')}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (!values.email || !isEmail(values.email)) {
            errors.email = 'Velue has to be an email';
          }

          if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
      >
        <Field name="email">
          <Field.Text
            label="Email"
            type="email"
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
        <button type="submit">Submit</button>
      </Form>
    </MainLayout>
  );
}
