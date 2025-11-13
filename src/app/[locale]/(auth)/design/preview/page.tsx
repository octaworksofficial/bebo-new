import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';
import { PreviewInterface } from '@/features/design/PreviewInterface';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PreviewPage(props: {
  params: { locale: string };
  searchParams: { 
    generationId?: string;
    product?: string; 
    size?: string; 
    frame?: string;
  };
}) {
  const { generationId, product, size, frame } = props.searchParams;

  if (!generationId || !product || !size || !frame) {
    // Redirect to products if missing params
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Geçersiz önizleme</h1>
            <p className="mt-2 text-gray-600">Lütfen ürün seçimi yapın</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PreviewInterface 
        locale={props.params.locale}
        generationId={generationId}
        productSlug={product}
        sizeSlug={size}
        frameSlug={frame}
      />
      <Footer />
    </>
  );
}
