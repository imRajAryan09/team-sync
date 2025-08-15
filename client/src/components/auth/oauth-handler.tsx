import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { tokenManager } from "@/lib/token-manager";

interface OAuthHandlerProps {
  children: React.ReactNode;
}

const OAuthHandler: React.FC<OAuthHandlerProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      tokenManager.setAccessToken(token);
      
      // Clean up URL by removing token parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("token");
      
      // Update URL without token
      const newSearch = newSearchParams.toString();
      const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "");
      navigate(newUrl, { replace: true });
    }
  }, [searchParams, navigate, setSearchParams]);

  return <>{children}</>;
};

export default OAuthHandler;