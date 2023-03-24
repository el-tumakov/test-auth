import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useStore } from '@/store';
import Button from '@/components/basic/Button';
import Field from '@/components/basic/Field';
import Form from '@/components/basic/Form';
import { EmailOutlined } from '@/components/basic/Icons';
import { requestNewPassword } from '@/actions/auth';
import { handleFormError, shake } from '@/utils';
import { VerificationCodeType } from '@/types/VerificationCodeType';

interface StepOneProps {
  setCodeParams: Dispatch<SetStateAction<VerificationCodeType>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const StepOne: React.FC<StepOneProps> = ({ setCodeParams, setStep }) => {
  const { userEmail, setUserEmail } = useStore();
  const [isSendShake, setShake] = useState(false);

  const onSubmit = useCallback(
    (values: any) => {
      const errors: Record<string, string> = {};
      let isError = false;

      if (!values.email || !isEmail(values.email)) {
        isError = true;
        errors.email = 'Value has to be an email';
      }

      if (isError) {
        shake(setShake);

        return errors;
      }

      return requestNewPassword(values)
        .then((response) => {
          setCodeParams(response);
          setStep(2);
        })
        .catch((err) => {
          shake(setShake);

          if (err?.cause?.statusCode === 404) {
            return { email: err.cause.message };
          }

          if (err?.cause?.error) {
            return handleFormError(err?.cause?.error);
          }
        });
    },
    [setCodeParams, setStep]
  );

  return (
    <Form name="recoveryFormStepOne" onSubmit={onSubmit} initialValues={{ email: userEmail }}>
      <Field name="email" onChange={setUserEmail}>
        <Field.Text
          label="Email"
          type="email"
          placeholder="mail@example.com"
          autoComplete="username"
          prefixIcon={<EmailOutlined />}
        />
      </Field>
      <Button type="submit" shake={isSendShake} fullWidth>
        Send code
      </Button>
    </Form>
  );
};

export default StepOne;
