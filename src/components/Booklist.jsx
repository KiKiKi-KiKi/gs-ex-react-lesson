export const Booklist = ({ language, getData }) => {
  const result = getData?.(language);

  return (
    <div>
      <p>This is {result} book list component</p>
    </div>
  );
};
