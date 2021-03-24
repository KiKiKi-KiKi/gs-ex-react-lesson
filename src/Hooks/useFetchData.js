import { useEffect, useState, useRef, useCallback } from 'react';

// interface useFetchData {
//   key: String;
//   fetcher: (key: string) => Promise<void>
// }
export const useFetchData = (key, fetcher) => {
  const initialData = {
    data: null,
    error: null,
  };
  const [featchState, setFeatchState] = useState(initialData);
  const dataRef = useRef(null);
  const errorRef = useRef(null);

  const update = useCallback((dataRef, errorRef) => {
    setFeatchState({
      data: dataRef.current,
      error: errorRef.current,
    });
  }, []);

  const dispose = useCallback(() => {
    setFeatchState(initialData);
  }, []);

  useEffect(() => {
    const featch = async () => {
      try {
        // console.log('> fetch!', key);
        const response = await fetcher(key);
        dataRef.current = response;
        errorRef.current = null;
      } catch (error) {
        dataRef.current = null;
        errorRef.current = error;
      }
      update(dataRef, errorRef);
    };
    featch();

    return () => dispose();
  }, [key]);

  return featchState;
};
