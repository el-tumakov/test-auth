import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginPanel from '@/components/structure/LoginPanel';

export default function LoginPage() {
  return (
    <MainLayout title="Authorization" description="Authorization in Egor Tumakov's test project">
      <AuthLayout>
        <LoginPanel />
      </AuthLayout>
    </MainLayout>
  );
}
