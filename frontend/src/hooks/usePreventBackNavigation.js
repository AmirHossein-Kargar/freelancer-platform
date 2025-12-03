import { useEffect } from "react";

/**
 * Custom hook to prevent browser back navigation
 * @param {boolean} shouldPrevent - Whether to prevent back navigation or not
 */
export function usePreventBackNavigation(shouldPrevent) {
  useEffect(() => {
    if (!shouldPrevent) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.go(1);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldPrevent]);
}
