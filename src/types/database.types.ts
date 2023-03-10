export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          image_url: string | null
          name: string | null
          register_complete: boolean | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          image_url?: string | null
          name?: string | null
          register_complete?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          register_complete?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
