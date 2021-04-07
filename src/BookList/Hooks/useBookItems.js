import axios from 'axios';
import { useFetchData } from '../../Hooks/useFetchData';

export const useBookItems = (keyword) => {
  const featcher = (keyword) => {
    const API = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: `intitle:${keyword}`,
    };

    return axios.get(API, { params });
  };

  const { data, error } = useFetchData(keyword, featcher);

  return {
    // item param become empty when data.totalItems is 0.
    bookData: data && data.data?.items,
    isLoading: !error && !data,
    isError: error,
  };
};
