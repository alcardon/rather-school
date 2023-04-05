export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          code: string | null;
          course_avatar_url: string | null;
          course_description: string | null;
          course_duration: string | null;
          course_id: string;
          course_language: string | null;
          course_level: string | null;
          course_status: boolean;
          course_subject: string;
          course_title: string | null;
          created_at: string;
          max_students: number;
          min_students: number;
          schedule: string;
          updated_at: string;
        };
        Insert: {
          code?: string | null;
          course_avatar_url?: string | null;
          course_description?: string | null;
          course_duration?: string | null;
          course_id?: string;
          course_language?: string | null;
          course_level?: string | null;
          course_status?: boolean;
          course_subject: string;
          course_title?: string | null;
          created_at?: string;
          max_students: number;
          min_students: number;
          schedule: string;
          updated_at?: string;
        };
        Update: {
          code?: string | null;
          course_avatar_url?: string | null;
          course_description?: string | null;
          course_duration?: string | null;
          course_id?: string;
          course_language?: string | null;
          course_level?: string | null;
          course_status?: boolean;
          course_subject?: string;
          course_title?: string | null;
          created_at?: string;
          max_students?: number;
          min_students?: number;
          schedule?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          is_admin: boolean | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      sibling_relationships: {
        Row: {
          relation_id: string;
          sibling_id: string;
          student_id: string;
        };
        Insert: {
          relation_id?: string;
          sibling_id: string;
          student_id: string;
        };
        Update: {
          relation_id?: string;
          sibling_id?: string;
          student_id?: string;
        };
      };
      student_enrollment_grade_duplicate: {
        Row: {
          completion_date: string | null;
          course_id: string;
          created_at: string | null;
          enrollment_date: string | null;
          enrollment_status: string | null;
          instructor_id: number | null;
          payment_status: boolean;
          progress: number | null;
          student_enrollment_grade_id: string;
          student_id: string;
        };
        Insert: {
          completion_date?: string | null;
          course_id: string;
          created_at?: string | null;
          enrollment_date?: string | null;
          enrollment_status?: string | null;
          instructor_id?: number | null;
          payment_status?: boolean;
          progress?: number | null;
          student_enrollment_grade_id?: string;
          student_id: string;
        };
        Update: {
          completion_date?: string | null;
          course_id?: string;
          created_at?: string | null;
          enrollment_date?: string | null;
          enrollment_status?: string | null;
          instructor_id?: number | null;
          payment_status?: boolean;
          progress?: number | null;
          student_enrollment_grade_id?: string;
          student_id?: string;
        };
      };
      students: {
        Row: {
          created_at: string | null;
          current_residence_country: string | null;
          date_of_birth: string | null;
          email_address: string | null;
          first_name: string | null;
          gender: string | null;
          home_address: string | null;
          last_name: string | null;
          learning_goals: string | null;
          occupation: string | null;
          phone_number: number | null;
          prefered_coms_chanel: string | null;
          preferred_lang: string | null;
          progress_level: string | null;
          status: string | null;
          student_avatar_url: string | null;
          student_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          current_residence_country?: string | null;
          date_of_birth?: string | null;
          email_address?: string | null;
          first_name?: string | null;
          gender?: string | null;
          home_address?: string | null;
          last_name?: string | null;
          learning_goals?: string | null;
          occupation?: string | null;
          phone_number?: number | null;
          prefered_coms_chanel?: string | null;
          preferred_lang?: string | null;
          progress_level?: string | null;
          status?: string | null;
          student_avatar_url?: string | null;
          student_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          current_residence_country?: string | null;
          date_of_birth?: string | null;
          email_address?: string | null;
          first_name?: string | null;
          gender?: string | null;
          home_address?: string | null;
          last_name?: string | null;
          learning_goals?: string | null;
          occupation?: string | null;
          phone_number?: number | null;
          prefered_coms_chanel?: string | null;
          preferred_lang?: string | null;
          progress_level?: string | null;
          status?: string | null;
          student_avatar_url?: string | null;
          student_id?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      enrollment_grade_details: {
        Row: {
          code: string | null;
          completion_date: string | null;
          course_avatar_url: string | null;
          course_id: string | null;
          course_title: string | null;
          created_at: string | null;
          enrollment_date: string | null;
          enrollment_status: string | null;
          instructor_id: number | null;
          payment_status: boolean | null;
          progress: number | null;
          student_enrollment_grade_id: string | null;
          student_id: string | null;
        };
      };
      enrollment_student_info: {
        Row: {
          completion_date: string | null;
          course_id: string | null;
          created_at: string | null;
          email_address: string | null;
          enrollment_date: string | null;
          enrollment_status: string | null;
          first_name: string | null;
          gender: string | null;
          instructor_id: number | null;
          last_name: string | null;
          payment_status: boolean | null;
          progress: number | null;
          student_avatar_url: string | null;
          student_enrollment_grade_id: string | null;
          student_id: string | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
