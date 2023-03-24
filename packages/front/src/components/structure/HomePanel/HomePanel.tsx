import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/actions/auth';
import Button from '@/components/basic/Button';
import styles from './HomePanel.module.css';

const HomePanel: React.FC<{}> = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onLogout = useCallback(async () => {
    setLoading(true);

    return logout()
      .then(() => {
        deleteCookie('tumakov.testauth.token');
        router.push('/login');
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
      });
  }, [router]);

  return (
    <>
      <h1 className="visually-hidden">Main page of Tumakov test auth site</h1>
      <p className={styles.title}>Congratulations! You are logged in!</p>
      <p className={styles.description}>
        Thank you for taking the time to visit my test login form.
      </p>
      <Button onClick={onLogout} loading={isLoading} fullWidth>
        Logout
      </Button>
    </>
  );
};

export default HomePanel;
