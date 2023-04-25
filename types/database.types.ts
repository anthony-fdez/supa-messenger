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
      friendships: {
        Row: {
          action_user_id: string
          created_at: string | null
          id: number
          room_id: string | null
          status: string
          user_email_1: string | null
          user_email_2: string | null
          user_id_1: string | null
          user_id_2: string | null
        }
        Insert: {
          action_user_id: string
          created_at?: string | null
          id?: number
          room_id?: string | null
          status?: string
          user_email_1?: string | null
          user_email_2?: string | null
          user_id_1?: string | null
          user_id_2?: string | null
        }
        Update: {
          action_user_id?: string
          created_at?: string | null
          id?: number
          room_id?: string | null
          status?: string
          user_email_1?: string | null
          user_email_2?: string | null
          user_id_1?: string | null
          user_id_2?: string | null
        }
      }
      messages: {
        Row: {
          created_at: string | null
          id: number
          is_edited: boolean
          message_body: string
          room_id: string
          thread_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_edited?: boolean
          message_body: string
          room_id: string
          thread_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_edited?: boolean
          message_body?: string
          room_id?: string
          thread_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
      }
      participants: {
        Row: {
          created_at: string | null
          id: number
          last_message_read: number | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_message_read?: number | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          last_message_read?: number | null
          room_id?: string
          user_id?: string
        }
      }
      room_passwords: {
        Row: {
          created_at: string | null
          created_by: string
          id: number
          password: string
          room_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: number
          password: string
          room_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: number
          password?: string
          room_id?: string
        }
      }
      rooms: {
        Row: {
          created_at: string | null
          created_by: string | null
          has_voice_channel: boolean
          id: string
          is_dm: boolean
          is_private: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          has_voice_channel?: boolean
          id?: string
          is_dm?: boolean
          is_private?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          has_voice_channel?: boolean
          id?: string
          is_dm?: boolean
          is_private?: boolean
          name?: string
        }
      }
      threads: {
        Row: {
          created_at: string | null
          id: number
          room_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          room_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          room_id?: string
        }
      }
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
      voice_channel: {
        Row: {
          created_at: string | null
          id: number
          room_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          room_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          room_id?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_user_participant_in_room: {
        Args: {
          p_user_id: string
          p_room_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
