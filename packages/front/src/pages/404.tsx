import MainLayout from '@/components/layout/MainLayout';
import ExceptionPanel from '@/components/structure/ExceptionPanel';

export default function Custom404() {
  return (
    <MainLayout title="Not found" description="Non-existent page">
      <ExceptionPanel
        statusCode={404}
        title="Something's missing."
        description="Sorry, we can't find that page. You'll find lots to explore on the home page."
      />
    </MainLayout>
  );
}
