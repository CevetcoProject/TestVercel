"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUser from "@/components/Tables/TableUser";

const AllPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Users" />

      <div className=" h-screen">
        <TableUser />
        <Pagination />
      </div>
    </DefaultLayout>
  );
};

export default AllPage;
