import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export const revalidate = 60;

/* export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data: students } = await supabase
    .from("students")
    .select("student_id");

  return students?.map(({ student_id }) => ({
    student_id,
  }));
}
 */
export default async function Page({
  params: { student },
}: {
  params: { student: string };
}) {
  const supabase = createServerClient();

  const { data: student_data } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", student);

  if (!student_data) {
    notFound();
  }

  const { data: student_siblings_ids } = await supabase
    .from("sibling_relationships")
    .select("sibling_id")
    .eq("student_id", student);
  console.log(student_siblings_ids);

  if (!student_siblings_ids) {
    notFound();
  }

  student_siblings_ids.map(async (sibling) => {
    const { data: sibling_data } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", sibling.sibling_id);

    console.log(sibling_data);

    if (!sibling_data) {
      notFound();
    }
  });

  return (
    <div className="pt-40">
      <div className="pt-40">
        <div className="pt-40">
          <pre>{JSON.stringify(student_data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
