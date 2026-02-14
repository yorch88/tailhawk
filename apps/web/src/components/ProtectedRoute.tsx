import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): JSX.Element | null {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async (): Promise<void> => {
      try {
        await getCurrentUser();
      } catch {
        localStorage.removeItem("access_token");
        if (isMounted) {
          navigate("/basic-login", { replace: true });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) return null;

  return <>{children}</>;
}
