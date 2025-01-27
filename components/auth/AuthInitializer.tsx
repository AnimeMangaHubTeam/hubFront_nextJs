'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axiosInstance from '@/lib/axios';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/app/users/current-user', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        console.log(response);
        if (response.data.success && response.data.value) {
          setAuth({
            isAuthenticated: true,
            user: response.data.value.user
          });
        }
      } catch (error:any) {
        console.error('Failed to initialize auth:', error);
      }
    };

    initializeAuth();
  }, []);

  return <>{children}</>;
}