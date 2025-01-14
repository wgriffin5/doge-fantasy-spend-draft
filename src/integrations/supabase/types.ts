export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      draft_picks: {
        Row: {
          created_at: string
          email: string
          id: string
          program_ids: string[]
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          program_ids: string[]
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          program_ids?: string[]
          status?: string
        }
        Relationships: []
      }
      email_capture_analytics: {
        Row: {
          created_at: string
          email: string | null
          event_type: string
          id: string
          type: string
          variant: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          event_type: string
          id?: string
          type: string
          variant: string
        }
        Update: {
          created_at?: string
          email?: string | null
          event_type?: string
          id?: string
          type?: string
          variant?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string
        }
        Relationships: []
      }
      league_members: {
        Row: {
          email: string
          id: string
          joined_at: string
          league_id: string | null
        }
        Insert: {
          email: string
          id?: string
          joined_at?: string
          league_id?: string | null
        }
        Update: {
          email?: string
          id?: string
          joined_at?: string
          league_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "league_members_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          code: string
          created_at: string
          created_by: string
          id: string
          name: string
        }
        Insert: {
          code?: string
          created_at?: string
          created_by: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      player_levels: {
        Row: {
          created_at: string
          email: string
          id: string
          level: string | null
          predictions_made: number | null
          successful_predictions: number | null
          total_points: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          level?: string | null
          predictions_made?: number | null
          successful_predictions?: number | null
          total_points?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          level?: string | null
          predictions_made?: number | null
          successful_predictions?: number | null
          total_points?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      program_comments: {
        Row: {
          content: string
          created_at: string
          email: string | null
          id: string
          is_meme: boolean | null
          likes: number | null
          parent_id: string | null
          program_id: string
        }
        Insert: {
          content: string
          created_at?: string
          email?: string | null
          id?: string
          is_meme?: boolean | null
          likes?: number | null
          parent_id?: string | null
          program_id: string
        }
        Update: {
          content?: string
          created_at?: string
          email?: string | null
          id?: string
          is_meme?: boolean | null
          likes?: number | null
          parent_id?: string | null
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_program"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "program_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_comments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          annual_budget: number
          created_at: string
          cut_amount: number | null
          cut_date: string | null
          department: string
          description: string
          id: string
          is_cut: boolean | null
          name: string
        }
        Insert: {
          annual_budget: number
          created_at?: string
          cut_amount?: number | null
          cut_date?: string | null
          department: string
          description: string
          id?: string
          is_cut?: boolean | null
          name: string
        }
        Update: {
          annual_budget?: number
          created_at?: string
          cut_amount?: number | null
          cut_date?: string | null
          department?: string
          description?: string
          id?: string
          is_cut?: boolean | null
          name?: string
        }
        Relationships: []
      }
      reform_predictions: {
        Row: {
          confidence_level: number | null
          created_at: string
          email: string
          id: string
          notes: string | null
          points_earned: number | null
          predicted_amount: number | null
          prediction_type: string
          program_id: string
          status: string | null
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          points_earned?: number | null
          predicted_amount?: number | null
          prediction_type: string
          program_id: string
          status?: string | null
        }
        Update: {
          confidence_level?: number | null
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          points_earned?: number | null
          predicted_amount?: number | null
          prediction_type?: string
          program_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reform_predictions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          created_at: string
          email: string
          id: string
          score: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          score?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          score?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_advanced_score: {
        Args: {
          prediction_type: string
          program_budget: number
          predicted_amount?: number
          confidence_level?: number
        }
        Returns: number
      }
      calculate_score: {
        Args: {
          program_budget: number
        }
        Returns: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
