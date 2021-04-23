import { useCallback } from 'react';
import { useChangeTodoStatus } from '../hooks/useChangeTodoStatus';

const TodoItem = ({
  id,
  isDone,
  isLoading,
  onChangeStatus,
  onDelete,
  children,
}) => {
  return (
    <div id={id} className="todo">
      <input
        type="checkbox"
        value={id}
        checked={isDone}
        onChange={onChangeStatus}
        disabled={isLoading}
      />
      <div className="todoBody">
        {!isDone ? <span>{children}</span> : <del>{children}</del>}
      </div>
      <button
        className="deleteBtn"
        type="button"
        onClick={onDelete}
        disabled={isLoading}
      >
        DELETE
      </button>
    </div>
  );
};

const useBuildTodoProps = ({ id, isDone, children }) => {
  const {
    isLoading,
    changeTodoStatusHandler,
    deleteTodoHandler,
  } = useChangeTodoStatus();

  const onChangeStatus = useCallback(async () => {
    try {
      await changeTodoStatusHandler({ id, status: !isDone });
    } catch (error) {
      alert('Change status fail', error.message);
    }
  }, [id, isDone, changeTodoStatusHandler]);

  const onDelete = useCallback(async () => {
    try {
      if (window.confirm(`Really delete ${id} ?`)) {
        await deleteTodoHandler({ id });
      }
    } catch (error) {
      alert('Delete todo fail', error.message);
    }
  }, [id, deleteTodoHandler]);

  return {
    id,
    isDone,
    isLoading,
    onChangeStatus,
    onDelete,
    children,
  };
};

export const Todo = ({ todo, dueDate, ...props }) => {
  return (
    <TodoItem {...useBuildTodoProps(props)}>
      <span className="todoTitle">{todo}</span>
      <span className="dueDate">
        DueDate: <time>{dueDate}</time>
      </span>
    </TodoItem>
  );
};
