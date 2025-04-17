"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CacheItem {
  data: any;
  timestamp: number;
}

interface DataCacheContextType {
  getCachedData: (key: string) => any;
  setCachedData: (key: string, data: any) => void;
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(undefined);

// Expiration time: 5 minutes
const CACHE_EXPIRY = 5 * 60 * 1000;

export function DataCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<Record<string, CacheItem>>({});

  // Load cache from localStorage on mount
  useEffect(() => {
    try {
      const savedCache = localStorage.getItem('data-cache');
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        // Filter out expired items
        const now = Date.now();
        const validCache = Object.entries(parsedCache).reduce((acc, [key, item]: [string, any]) => {
          if (now - item.timestamp < CACHE_EXPIRY) {
            acc[key] = item;
          }
          return acc;
        }, {} as Record<string, CacheItem>);
        
        setCache(validCache);
      }
    } catch (error) {
      console.error("Failed to load cache:", error);
    }
  }, []);

  // Save cache to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('data-cache', JSON.stringify(cache));
    } catch (error) {
      console.error("Failed to save cache:", error);
    }
  }, [cache]);

  const getCachedData = (key: string) => {
    const item = cache[key];
    
    if (!item) return null;
    
    // Check if data is expired
    if (Date.now() - item.timestamp > CACHE_EXPIRY) {
      // Remove expired item
      const newCache = { ...cache };
      delete newCache[key];
      setCache(newCache);
      return null;
    }
    
    return item.data;
  };

  const setCachedData = (key: string, data: any) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }));
  };

  return (
    <DataCacheContext.Provider value={{ getCachedData, setCachedData }}>
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  const context = useContext(DataCacheContext);
  if (context === undefined) {
    throw new Error("useDataCache must be used within a DataCacheProvider");
  }
  return context;
}