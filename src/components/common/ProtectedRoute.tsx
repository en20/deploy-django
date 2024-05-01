/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAuthContext } from "@/context/authContext";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute<T extends Record<string, any>>(
  Component: NextPage<T>,
): NextPage<T> {
  const WrapperPage: NextPage<T> = (props) => {
    const router = useRouter();

    const { isAuthenticated, isLoading} = useAuthContext();

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading]);

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  WrapperPage.displayName = `ProtectedPage(${getDisplayName(WrapperPage)})`;

  return WrapperPage;
}

function getDisplayName<T>(Component: NextPage<T>) {
  return Component.displayName || Component.name || "Component";
}

export default ProtectedRoute;
