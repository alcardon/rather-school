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
      rooms: {
        Row: {
          active: boolean;
          created_at: string;
          id: number;
          max_students: number;
          min_students: number;
          schedule: string;
          subject: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          id?: number;
          max_students: number;
          min_students: number;
          schedule: string;
          subject: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          id?: number;
          max_students?: number;
          min_students?: number;
          schedule?: string;
          subject?: string;
          updated_at?: string;
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
          date_of_birth: string | null;
          email_address: string | null;
          emergency_contact_name: string | null;
          emergency_contact_number: number | null;
          first_name: string | null;
          gender: string | null;
          grade_level: number | null;
          home_address: string | null;
          last_name: string | null;
          phone_number: number | null;
          student_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          date_of_birth?: string | null;
          email_address?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_number?: number | null;
          first_name?: string | null;
          gender?: string | null;
          grade_level?: number | null;
          home_address?: string | null;
          last_name?: string | null;
          phone_number?: number | null;
          student_id?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          date_of_birth?: string | null;
          email_address?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_number?: number | null;
          first_name?: string | null;
          gender?: string | null;
          grade_level?: number | null;
          home_address?: string | null;
          last_name?: string | null;
          phone_number?: number | null;
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
