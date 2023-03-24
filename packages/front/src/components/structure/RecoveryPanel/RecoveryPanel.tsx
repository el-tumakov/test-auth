import { useState } from 'react';
import Link from 'next/link';
import { VerificationCodeType } from '@/types/VerificationCodeType';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import styles from './RecoveryPanel.module.css';

const RecoveryPanel: React.FC<{}> = () => {
  const [step, setStep] = useState(1);
  const [codeParams, setCodeParams] = useState<VerificationCodeType>({
    updated: false,
    lifeTime: 0,
    holdTime: 0,
  });

  return (
    <>
      <h1>Password recovery</h1>
      {step === 1 ? <StepOne setCodeParams={setCodeParams} setStep={setStep} /> : null}
      {step === 2 ? (
        <StepTwo codeParams={codeParams} setCodeParams={setCodeParams} setStep={setStep} />
      ) : null}
      <p className={styles.registerDescription}>
        Remembered your password? <Link href="/login">Login</Link>
      </p>
      <p className={styles.registerDescription}>
        Don’t have an account yet? <Link href="/register">Register</Link>
      </p>
    </>
  );
};

export default RecoveryPanel;
