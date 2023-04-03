"use client";

import CardTable from "@/components/dashboard/common/cardTable";

export default function Page() {
  return (
    <>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardTable />
        </div>
        <div className="mb-12 w-full px-4">
          {/*  <CardTable color="dark" /> */}
        </div>
      </div>
    </>
  );
}
