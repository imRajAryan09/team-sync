import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { tokenManager } from '@/lib/token-manager';

const TokenHandler = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('token');

    if (accessToken) {
      tokenManager.setAccessToken(accessToken);
      
      // Remove token from URL
      const newUrl = window.location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [searchParams, navigate]);

  return <>{children}</>;
};

export default TokenHandler;