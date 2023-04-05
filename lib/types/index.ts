import { Database } from "../database.types";

export type Students = Database["public"]["Tables"]["students"]["Row"];
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type Courses = Database["public"]["Tables"]["courses"]["Row"];
