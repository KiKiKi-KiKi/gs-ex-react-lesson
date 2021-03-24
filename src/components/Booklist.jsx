import { useBookItems } from '../Hooks/useBookItems';

const Empty = () => {
  return <p>No data.</p>;
};

const Book = ({ title, infoLink, description }) => {
  return (
    <div>
      <a href={infoLink} target="blank" rel="nopener">
        <h3>{title}</h3>
      </a>
      <p>{description}</p>
    </div>
  );
};

export const Booklist = ({ language }) => {
  const { bookData } = useBookItems(language);

  return (
    <div>
      <p>This is {language} book list component</p>
      <div>
        {bookData ? (
          <ul>
            {bookData.map((item) => {
              return (
                item.volumeInfo && (
                  <li key={item.id}>
                    <Book {...item.volumeInfo} />
                  </li>
                )
              );
            })}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
