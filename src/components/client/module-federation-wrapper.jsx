"use client";

import { useEffect, useState } from "react";

function ModuleFederationWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkReady = () => {
      if (typeof window !== "undefined") {
        console.log("Module Federation Wrapper: Checking readiness");
        setIsReady(true);
      }
    };

    checkReady();

    const timer = setTimeout(checkReady, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div>Initializing Module Federation...</div>;
  }

  return children;
}

export default ModuleFederationWrapper;
