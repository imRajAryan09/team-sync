import { getCurrentUserQueryFn } from "@/lib/api";
import { tokenManager } from "@/lib/token-manager";
import { useQuery } from "@tanstack/react-query";

const useAuth = (enabled: boolean = true) => {
  const hasToken = tokenManager.hasAccessToken();
  
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: unknown) => {
      // Don't retry if it's an auth error
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response.status === 401) {
          return false;
        }
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: enabled && hasToken, // Only run when enabled and token exists
  });
};

export default useAuth;
