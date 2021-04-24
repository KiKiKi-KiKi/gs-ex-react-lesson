import dayjs from 'dayjs';
import { useContext } from 'react';
import { TodoContext } from '../Contexts/todo.context';
import { Todo } from './Todo';

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
            <Todo
              id={id}
              todo={data.todo}
              dueDate={formatDueDate(data?.dueDate.toDate())}
              isDone={data.isDone}
            />
          </li>
        );
      })}
    </ul>
  );
};
