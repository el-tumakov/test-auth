import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import RecoveryPanel from '@/components/structure/RecoveryPanel';

export default function RecoveryPage() {
  return (
    <MainLayout
      title="Password recovery"
      description="Password recovery in Egor Tumakov's test project"
    >
      <AuthLayout>
        <RecoveryPanel />
      </AuthLayout>
    </MainLayout>
  );
}
