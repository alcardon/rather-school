import { Database } from "../database.types";

export type Students = Database["public"]["Tables"]["students"]["Row"];
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type Courses = Database["public"]["Tables"]["courses"]["Row"];
export type enrollment_grade_details =
  Database["public"]["Views"]["enrollment_grade_details"]["Row"];
export type enrollment_student_info =
  Database["public"]["Views"]["enrollment_student_info"]["Row"];
