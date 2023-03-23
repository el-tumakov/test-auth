import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterPanel from '@/components/structure/RegisterPanel';

export default function RegisterPage() {
  return (
    <MainLayout title="Registration" description="Registration in Egor Tumakov's test project">
      <AuthLayout>
        <RegisterPanel />
      </AuthLayout>
    </MainLayout>
  );
}
