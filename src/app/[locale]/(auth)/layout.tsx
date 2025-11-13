export default function AuthLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ClerkProvider is now in the root layout
  // Note: Authentication protection is handled by middleware for routes like
  // /dashboard, /design, /purchase-credits, etc.
  // Sign-in and sign-up pages are in (center) subfolder but don't require auth
  return <>{props.children}</>;
}
