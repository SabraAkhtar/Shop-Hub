import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Register tab is now part of LoginPage — redirect there
export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);
  return null;
};
