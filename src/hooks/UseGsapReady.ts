import { useEffect, useState } from 'react';

export function useGsapReady(selector: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkElements = () => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkElements()) return;

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      if (checkElements()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      checkElements();
      observer.disconnect();
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [selector]);

  return isReady;
}
