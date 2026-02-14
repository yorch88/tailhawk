import { useEffect } from "react";
import type { ReactNode } from "react";
import LayoutProvider from "@/context/useLayoutContext";
import { useLocation } from "react-router";

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}

type ProvidersWrapperProps = {
  children: ReactNode;
};

export default function ProvidersWrapper({
  children,
}: ProvidersWrapperProps): JSX.Element {
  const location = useLocation();

  const initPreline = () => {
    if (typeof window !== "undefined" && window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  };

  useEffect(() => {
    import("preline/preline").then(() => {
      initPreline();
    });
  }, []);

  useEffect(() => {
    initPreline();
  }, [location.pathname]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      initPreline();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <LayoutProvider>{children}</LayoutProvider>;
}
