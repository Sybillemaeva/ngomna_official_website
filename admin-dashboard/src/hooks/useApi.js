import { useState, useEffect } from 'react';
import apiService from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dependencies.length > 0) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Specific hooks for common API operations
export const useMenus = () => {
  return useApi(apiService.getAllMenus, []);
};

export const usePages = () => {
  return useApi(apiService.getAllPages, []);
};

export const useMenuItems = (menuId) => {
  return useApi(() => apiService.getMenuItems(menuId), [menuId]);
};

export const useTextContent = (pageId) => {
  return useApi(() => apiService.getTextByPageId(pageId), [pageId]);
};

export const useLinks = (menuId) => {
  return useApi(() => apiService.getLinksByMenuId(menuId), [menuId]);
};
