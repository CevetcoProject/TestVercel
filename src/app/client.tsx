"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import NextAuthSessionProvider from "./provider/sessionProvider";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function AppWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any; // La session sera optionnelle
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
        )}
      </div>
  );
}
