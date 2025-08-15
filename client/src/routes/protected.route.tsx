import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { tokenManager } from "@/lib/token-manager";
import { authService } from "@/lib/auth-service";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasValidToken, setHasValidToken] = useState(false);
  
  useEffect(() => {
    const initAuth = async () => {
      if (!tokenManager.hasAccessToken()) {
        const accessToken = await authService.refreshToken();
        setHasValidToken(!!accessToken);
      } else {
        setHasValidToken(true);
      }
      setIsInitializing(false);
    };
    
    initAuth();
  }, []);
  
  const { data: authData, isLoading } = useAuth(hasValidToken && !isInitializing);
  const user = authData?.user;

  if (isInitializing) {
    return <DashboardSkeleton />;
  }

  if (!hasValidToken) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
