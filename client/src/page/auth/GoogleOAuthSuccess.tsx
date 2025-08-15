import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "@/lib/auth-service";
import { getCurrentUserQueryFn } from "@/lib/api";
import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";

const GoogleOAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    
    if (status === "success") {
      // OAuth was successful, refresh token should be set as cookie
      authService.refreshToken().then(async (accessToken) => {
        if (accessToken) {
          try {
            // Get user data to find current workspace
            const userData = await getCurrentUserQueryFn();
            const currentWorkspace = userData.user.currentWorkspace;
            
            if (currentWorkspace) {
              navigate(`/workspace/${currentWorkspace.toString()}`, { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          } catch (error) {
            console.log("Error while GoogleOAuthSuccess ", error)
            navigate("/?error=user_fetch_failed", { replace: true });
          }
        } else {
          navigate("/?error=auth_failed", { replace: true });
        }
      });
    } else {
      navigate("/?error=oauth_failed", { replace: true });
    }
  }, [navigate, searchParams]);

  return <DashboardSkeleton />;
};

export default GoogleOAuthSuccess;