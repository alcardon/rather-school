import { classNames } from "@/components/dashboard/common/Utils";

interface StatusPillProps {
  value: Boolean;
}

export default function StatusPillCourses({ value }: StatusPillProps) {
  const status = value ? "Active" : "Inactive";

  return (
    <span
      className={ classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold shadow-sm",
        status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800",

      ) }
    >
      { status }
    </span>
  );
}
