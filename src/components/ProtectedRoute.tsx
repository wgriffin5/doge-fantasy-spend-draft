import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: { 
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();

        setIsAdmin(profile?.is_admin || false);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Error",
          description: "Failed to verify authentication",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this page",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}