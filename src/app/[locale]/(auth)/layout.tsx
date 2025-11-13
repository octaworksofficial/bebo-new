export default function AuthLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ClerkProvider is now in the root layout
  return <>{props.children}</>;
}
