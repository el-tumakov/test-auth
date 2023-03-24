import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { setCookie } from 'cookies-next';
import { useStore } from '@/store';
import Button from '@/components/basic/Button';
import Field from '@/components/basic/Field';
import Form from '@/components/basic/Form';
import { KeyOutlined, LockOutlined } from '@/components/basic/Icons';
import { handleFormError, shake } from '@/utils';
import { VerificationCodeType } from '@/types/VerificationCodeType';
import { requestNewPassword, setNewPassword } from '@/actions/auth';
import styles from './StepTwo.module.css';
import PasswordStrength from '@/components/basic/PasswordStrength';

interface StepTwo {
  codeParams: VerificationCodeType;
  setCodeParams: Dispatch<SetStateAction<VerificationCodeType>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const StepTwo: React.FC<StepTwo> = ({ codeParams, setCodeParams, setStep }) => {
  const router = useRouter();
  const { userEmail } = useStore();
  const [isShake, setShake] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>();
  const [isLoading, setLoading] = useState(false);

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

      if (!values.code) {
        isError = true;
        errors.code = 'Code is required';
      }

      if (!values.newPassword || !correctPassword.test(values.newPassword)) {
        isError = true;
        errors.newPassword = 'Minimum 8 characters, 1 letter and 1 number';
      }

      if (isError) {
        shake(setShake);

        return errors;
      }

      setLoading(true);

      return setNewPassword(values)
        .then((response) => {
          if (response.reset) {
            setLoading(false);

            return { code: 'Too many attempts' };
          }

          if (!response.valid) {
            setLoading(false);

            return { code: 'Invalid code' };
          }

          if (response.token) {
            setCookie('tumakov.testauth.token', response.token);
            router.push('/');
          }
        })
        .catch((err) => {
          setLoading(false);
          shake(setShake);

          if (err?.cause?.error) {
            return handleFormError(err?.cause?.error);
          }
        });
    },
    [router]
  );

  const onRequestCode = useCallback(async () => {
    return requestNewPassword({ email: userEmail }).then((response) => {
      setCodeParams(response);
    });
  }, [setCodeParams, userEmail]);

  const onChangeEmail = useCallback(() => {
    setStep(1);
  }, [setStep]);

  useEffect(() => {
    if (codeParams.holdTime > 0) {
      setTimeout(() => {
        setCodeParams({ ...codeParams, holdTime: codeParams.holdTime - 1000 });
      }, 1000);
    }
  }, [codeParams, setCodeParams]);

  return (
    <Form name="recoveryFormStepOne" onSubmit={onSubmit} initialValues={{ email: userEmail }}>
      <div className={styles.description}>
        <p className={styles.text}>
          We have sent a verification code to <span className={styles.email}>{userEmail}</span>
        </p>

        <p className={styles.text}>
          <span>
            You can{' '}
            <button className={styles.button} type="button" onClick={onChangeEmail}>
              change email
            </button>{' '}
            or request the code{' '}
          </span>
          {codeParams.holdTime > 999 ? (
            <span>again in {dayjs(codeParams.holdTime).format('mm:ss')}</span>
          ) : (
            <button
              className={styles.button}
              type="button"
              aria-label="request code again"
              onClick={onRequestCode}
            >
              again
            </button>
          )}
        </p>
      </div>

      <div className="visually-hidden" aria-hidden>
        <Field name="email" initialValue={userEmail}>
          <Field.Text
            label="Email"
            type="email"
            placeholder="mail@example.com"
            autoComplete="username"
          />
        </Field>
      </div>

      <Field name="code">
        <Field.Text
          label="Verification code"
          type="number"
          inputMode="numeric"
          placeholder="0000"
          autoComplete="one-time-code"
          prefixIcon={<LockOutlined />}
        />
      </Field>

      <Field
        name="newPassword"
        onChange={setPasswordValue}
        onFocus={onPasswordFocus}
        onBlur={onPasswordBlur}
      >
        <Field.Password
          label="New password"
          autoComplete="new-password"
          prefixIcon={<KeyOutlined />}
          description="Minimum 8 characters, 1 letter and 1 number"
        />
        {isPasswordFocus ? <PasswordStrength password={passwordValue} /> : null}
      </Field>

      <Button type="submit" shake={isShake} loading={isLoading} fullWidth>
        Change password
      </Button>
    </Form>
  );
};

export default StepTwo;
