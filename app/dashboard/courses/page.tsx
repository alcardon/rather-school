import CardTable from "@/components/dashboard/common/cardTable";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mt-4 flex flex-wrap">
      <div className="mb-12 w-full px-4">
        <CardTable />
      </div>
      {/* <div className="w-full px-4 mb-12">
        <CardTable color="dark" />
      </div> */}
    </div>
  );
}
