import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";
import { useEffect, useState } from "react";
import { tokenManager } from "@/lib/token-manager";
import { authService } from "@/lib/auth-service";

const AuthRoute = () => {
  const location = useLocation();
  const _isAuthRoute = isAuthRoute(location.pathname);
  const isRootRoute = location.pathname === "/";
  
  const [isInitializing, setIsInitializing] = useState(isRootRoute);
  const [hasValidToken, setHasValidToken] = useState(false);
  
  useEffect(() => {
    if (isRootRoute) {
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
    }
  }, [isRootRoute]);
  
  // Enable auth query if we're not on an auth route OR if we're on root route with valid token
  const shouldCheckAuth = !_isAuthRoute || (isRootRoute && hasValidToken && !isInitializing);
  const { data: authData, isLoading } = useAuth(shouldCheckAuth);
  const user = authData?.user;

  if (isInitializing) return <DashboardSkeleton />;
  if (isLoading && shouldCheckAuth) return <DashboardSkeleton />;

  if (!user) return <Outlet />;

  return <Navigate to={`workspace/${user.currentWorkspace}`} replace />;
};

export default AuthRoute;
