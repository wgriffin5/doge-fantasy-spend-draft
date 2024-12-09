export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spending_programs: {
        Row: {
          id: string
          name: string
          description: string
          annual_budget: number
          department: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          annual_budget: number
          department: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          annual_budget?: number
          department?: string
        }
      }
      draft_picks: {
        Row: {
          id: string
          email: string
          program_ids: string[]
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          program_ids: string[]
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          program_ids?: string[]
          created_at?: string
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