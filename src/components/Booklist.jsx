import { useState, useEffect } from 'react';

export const Booklist = ({ language, getData }) => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const getBookData = async () => {
      const res = await getData?.(language);
      if (res) {
        setBookData(res);
      }
    };
    getBookData();
  }, [language, getData]);

  return (
    <div>
      <p>This is {language} book list component</p>
      <p>{bookData && JSON.stringify(bookData)}</p>
    </div>
  );
};
