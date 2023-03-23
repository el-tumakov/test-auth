import Logo from '@/components/basic/Logo';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <section className={styles.wrap}>
      <Logo />
      <div className={styles.authWrap}>{children}</div>
    </section>
  );
};

export default AuthLayout;
