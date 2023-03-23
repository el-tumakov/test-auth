import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterPanel from '@/components/structure/RegisterPanel';

export default function RegisterPage() {
  return (
    <MainLayout title="Registration">
      <AuthLayout>
        <RegisterPanel />
      </AuthLayout>
    </MainLayout>
  );
}
