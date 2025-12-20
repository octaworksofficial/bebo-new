import { auth } from '@clerk/nextjs/server';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:left-8 sm:top-8"
      >
        <ChevronLeft className="size-4" />
        Ana Sayfaya Dön
      </Link>
      {props.children}
    </div>
  );
}
