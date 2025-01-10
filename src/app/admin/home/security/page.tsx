import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title:
    "Admin Security",
  description: "Welcome in your dashboard",
};

export default function Home() {
  return (
    <>
        <DefaultLayout>
            <Dashboard />
        </DefaultLayout>
    </>
  );
}