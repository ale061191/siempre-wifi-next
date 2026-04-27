import DestinationDetailPage from '@/components/DestinationDetailPage';
import { Suspense } from 'react';

export default async function DestinoDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug).replace(/-/g, ' ');
  const capitalizedSlug = decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1);
  
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DestinationDetailPage destination={capitalizedSlug} />
    </Suspense>
  );
}
