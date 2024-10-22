
import AuthStateCheck from '@/components/Auth/AuthStateCheck';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <AuthStateCheck>

          {children}
        </AuthStateCheck>
      );
}
