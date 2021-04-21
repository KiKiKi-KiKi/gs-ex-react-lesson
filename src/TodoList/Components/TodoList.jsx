import dayjs from 'dayjs';
import { useContext } from 'react';
import { TodoContext } from '../Contexts/todo.context';

const formatDueDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '';
};

export const TodoList = () => {
  const {
    state: { todos },
  } = useContext(TodoContext);

  return (
    <ul>
      {todos?.map(([id, data]) => {
        return (
          <li key={id} id={id}>
            <span>{data.todo}</span>
            <span>DueDate: {formatDueDate(data?.dueDate.toDate())}</span>
          </li>
        );
      })}
    </ul>
  );
};
