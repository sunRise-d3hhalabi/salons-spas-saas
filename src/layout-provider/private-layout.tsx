"use client";
import React from "react";
import Header from "./header";

import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/users";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/error-message";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [user = null, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token: any = Cookies.get("token");
      const response = await getCurrentUser(token);

      if (response.success) {
        setUser(response.data);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
