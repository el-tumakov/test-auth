import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import RecoveryPanel from '@/components/structure/RecoveryPanel';

export default function RecoveryPage() {
  return (
    <MainLayout title="Password recovery">
      <AuthLayout>
        <RecoveryPanel />
      </AuthLayout>
    </MainLayout>
  );
}
