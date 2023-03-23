import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import HomePanel from '@/components/structure/HomePanel';
import { checkSession } from '@/actions/auth';

export default function HomePage() {
  return (
    <MainLayout title="Home page" description="Home page in Egor Tumakov's test project">
      <AuthLayout>
        <HomePanel />
      </AuthLayout>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie('tumakov.testauth.token', { req, res });

  if (token) {
    try {
      const session = await checkSession({ token: token as string });

      if (session.auth) {
        return { props: {} };
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    redirect: {
      destination: `/login`,
      permanent: false,
    },
  };
};
