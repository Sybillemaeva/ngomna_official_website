import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useMenus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const menus = await apiService.getMenus();
        setData(menus);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return { data, loading, error };
};

export const usePages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const pages = await apiService.getPages();
        setData(pages);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { data, loading, error };
};

export const useTextContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (pageId) => {
    try {
      setLoading(true);
      const textContent = await apiService.getTextByPageId(pageId);
      setData(textContent);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};