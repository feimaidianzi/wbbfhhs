export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_name: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_email: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_assistant_analytics: {
        Row: {
          avg_messages_per_conversation: number | null
          created_at: string
          date: string
          human_transfers: number | null
          id: string
          leads_captured: number | null
          peak_hours: Json | null
          top_topics: Json | null
          total_conversations: number | null
        }
        Insert: {
          avg_messages_per_conversation?: number | null
          created_at?: string
          date?: string
          human_transfers?: number | null
          id?: string
          leads_captured?: number | null
          peak_hours?: Json | null
          top_topics?: Json | null
          total_conversations?: number | null
        }
        Update: {
          avg_messages_per_conversation?: number | null
          created_at?: string
          date?: string
          human_transfers?: number | null
          id?: string
          leads_captured?: number | null
          peak_hours?: Json | null
          top_topics?: Json | null
          total_conversations?: number | null
        }
        Relationships: []
      }
      ai_conversation_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          created_at: string
          ended_at: string | null
          human_agent_id: string | null
          id: string
          is_transferred_to_human: boolean | null
          session_id: string
          started_at: string
          status: string | null
          transferred_at: string | null
          visitor_device: string | null
          visitor_ip: string | null
          visitor_location: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          human_agent_id?: string | null
          id?: string
          is_transferred_to_human?: boolean | null
          session_id: string
          started_at?: string
          status?: string | null
          transferred_at?: string | null
          visitor_device?: string | null
          visitor_ip?: string | null
          visitor_location?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          human_agent_id?: string | null
          id?: string
          is_transferred_to_human?: boolean | null
          session_id?: string
          started_at?: string
          status?: string | null
          transferred_at?: string | null
          visitor_device?: string | null
          visitor_ip?: string | null
          visitor_location?: string | null
        }
        Relationships: []
      }
      customer_leads: {
        Row: {
          budget_range: string | null
          company: string | null
          conversation_id: string | null
          created_at: string
          email: string | null
          id: string
          lead_score: number | null
          location: string | null
          name: string | null
          notes: string | null
          phone: string | null
          product_interest: string | null
          requirements: string | null
          status: string | null
          updated_at: string
          urgency: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          conversation_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          lead_score?: number | null
          location?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          product_interest?: string | null
          requirements?: string | null
          status?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          conversation_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          lead_score?: number | null
          location?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          product_interest?: string | null
          requirements?: string | null
          status?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_leads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          product_interest: string | null
          replied_at: string | null
          replied_by: string | null
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          product_interest?: string | null
          replied_at?: string | null
          replied_by?: string | null
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          product_interest?: string | null
          replied_at?: string | null
          replied_by?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          ai_edited: boolean | null
          author_id: string | null
          author_name: string | null
          category: string | null
          content: string
          content_en: string | null
          cover_image: string | null
          created_at: string
          id: string
          is_auto_generated: boolean | null
          is_published: boolean | null
          keywords: string[] | null
          original_title: string | null
          published_at: string | null
          quality_reason: string | null
          quality_score: number | null
          source_name: string | null
          source_url: string | null
          summary: string | null
          summary_en: string | null
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          ai_edited?: boolean | null
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content: string
          content_en?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_auto_generated?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          original_title?: string | null
          published_at?: string | null
          quality_reason?: string | null
          quality_score?: number | null
          source_name?: string | null
          source_url?: string | null
          summary?: string | null
          summary_en?: string | null
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          ai_edited?: boolean | null
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content?: string
          content_en?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_auto_generated?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          original_title?: string | null
          published_at?: string | null
          quality_reason?: string | null
          quality_score?: number | null
          source_name?: string | null
          source_url?: string | null
          summary?: string | null
          summary_en?: string | null
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      news_collection_tasks: {
        Row: {
          articles_collected: number | null
          articles_published: number | null
          category: string
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          keyword: string
          status: string | null
        }
        Insert: {
          articles_collected?: number | null
          articles_published?: number | null
          category: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          keyword: string
          status?: string | null
        }
        Update: {
          articles_collected?: number | null
          articles_published?: number | null
          category?: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          keyword?: string
          status?: string | null
        }
        Relationships: []
      }
      news_keywords: {
        Row: {
          ai_rules: Json | null
          category: string
          created_at: string
          id: string
          is_active: boolean | null
          keyword: string
          keyword_en: string | null
          priority: number | null
          updated_at: string
        }
        Insert: {
          ai_rules?: Json | null
          category: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keyword: string
          keyword_en?: string | null
          priority?: number | null
          updated_at?: string
        }
        Update: {
          ai_rules?: Json | null
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keyword?: string
          keyword_en?: string | null
          priority?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          description_en: string | null
          features: string[] | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          is_published: boolean | null
          name: string
          name_en: string | null
          original_price: number | null
          price: number | null
          sort_order: number | null
          specifications: Json | null
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          description_en?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          name: string
          name_en?: string | null
          original_price?: number | null
          price?: number | null
          sort_order?: number | null
          specifications?: Json | null
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          description_en?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          name?: string
          name_en?: string | null
          original_price?: number | null
          price?: number | null
          sort_order?: number | null
          specifications?: Json | null
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scheduled_tasks: {
        Row: {
          ai_rules: Json | null
          article_count: number | null
          auto_publish: boolean | null
          category: string | null
          created_at: string
          cron_expression: string
          description: string | null
          id: string
          is_enabled: boolean | null
          last_error: string | null
          last_run_at: string | null
          last_status: string | null
          name: string
          next_run_at: string | null
          updated_at: string
        }
        Insert: {
          ai_rules?: Json | null
          article_count?: number | null
          auto_publish?: boolean | null
          category?: string | null
          created_at?: string
          cron_expression: string
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          last_error?: string | null
          last_run_at?: string | null
          last_status?: string | null
          name: string
          next_run_at?: string | null
          updated_at?: string
        }
        Update: {
          ai_rules?: Json | null
          article_count?: number | null
          auto_publish?: boolean | null
          category?: string | null
          created_at?: string
          cron_expression?: string
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          last_error?: string | null
          last_run_at?: string | null
          last_status?: string | null
          name?: string
          next_run_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      specification_templates: {
        Row: {
          category: string
          created_at: string
          fields: Json
          id: string
          is_default: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          fields?: Json
          id?: string
          is_default?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          fields?: Json
          id?: string
          is_default?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      trigger_category_news_collection: {
        Args: { article_count?: number; category_name: string }
        Returns: undefined
      }
      trigger_daily_news_collection: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
