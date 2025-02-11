'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axiosInstance from '@/lib/axios';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing auth...');
      try {
        const response = await axiosInstance.get('/api/app/users/current-user', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        console.log("error");
        console.log(response);
        if (response.data.success && response.data.value) {
          setAuth({
            isAuthenticated: true,
            user: response.data.value
          });
        }
      } catch (error:any) {
        console.log("no refresh token or expired refresh token")
      }
    };

    initializeAuth();
  }, []);

  return <>{children}</>;
}