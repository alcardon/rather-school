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
          active: boolean;
          code: string | null;
          course_avatar_url: string | null;
          course_id: number;
          created_at: string;
          max_students: number;
          min_students: number;
          schedule: string;
          subject: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          code?: string | null;
          course_avatar_url?: string | null;
          course_id?: number;
          created_at?: string;
          max_students: number;
          min_students: number;
          schedule: string;
          subject: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          code?: string | null;
          course_avatar_url?: string | null;
          course_id?: number;
          created_at?: string;
          max_students?: number;
          min_students?: number;
          schedule?: string;
          subject?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          course_id: number | null;
          enrollment_date: string | null;
          enrollment_id: number;
          student_id: number | null;
        };
        Insert: {
          course_id?: number | null;
          enrollment_date?: string | null;
          enrollment_id: number;
          student_id?: number | null;
        };
        Update: {
          course_id?: number | null;
          enrollment_date?: string | null;
          enrollment_id?: number;
          student_id?: number | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      sibling_relationships: {
        Row: {
          sibling_id: number | null;
          student_id: number | null;
        };
        Insert: {
          sibling_id?: number | null;
          student_id?: number | null;
        };
        Update: {
          sibling_id?: number | null;
          student_id?: number | null;
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
          phone_number: number | null;
          preferred_lang: string | null;
          status: string | null;
          student_avatar_url: string | null;
          student_id: number;
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
          phone_number?: number | null;
          preferred_lang?: string | null;
          status?: string | null;
          student_avatar_url?: string | null;
          student_id?: number;
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
          phone_number?: number | null;
          preferred_lang?: string | null;
          status?: string | null;
          student_avatar_url?: string | null;
          student_id?: number;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
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
