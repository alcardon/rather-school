import { classNames } from "@/components/dashboard/common/shared/Utils";

interface StatusPillProps {
  value: "active" | "inactive";
}

export default function StatusPill({ value }: StatusPillProps) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null
      )}
    >
      {status}
    </span>
  );
}
