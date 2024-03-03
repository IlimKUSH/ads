import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ApiResponse<D = never> {
  results: D;
  page?: number;
  pageSize?: number;
  total?: number;
}

axios.defaults.baseURL = 'http://localhost:8080/api';
export default function useAxios<T = ApiResponse>(
  axiosParams: AxiosRequestConfig
) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params = axiosParams) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e);
        toast(e.message, {
          type: 'error',
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, loading, update: fetchData };
}
