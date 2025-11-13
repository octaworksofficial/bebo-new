import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';
import { ChatInterface } from '@/features/design/ChatInterface';

export default function DesignPage(props: {
  params: { locale: string };
  searchParams: { product?: string; size?: string; frame?: string };
}) {
  return (
    <>
      <Navbar />
      <ChatInterface 
        locale={props.params.locale}
        productSlug={props.searchParams.product}
        sizeSlug={props.searchParams.size}
        frameSlug={props.searchParams.frame}
      />
      <Footer />
    </>
  );
}
