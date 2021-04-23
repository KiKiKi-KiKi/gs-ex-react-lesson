import { useCallback } from 'react';
import { useChangeTodoStatus } from '../hooks/useChangeTodoStatus';

const TodoItem = ({ id, isDone, isLoading, onChangeStatus, children }) => {
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
      <button className="deleteBtn" type="button">
        DELETE
      </button>
    </div>
  );
};

const useBuildTodoProps = ({ id, isDone, children }) => {
  const { isLoading, changeTodoStatusHandler } = useChangeTodoStatus();
  const onChangeStatus = useCallback(() => {
    try {
      changeTodoStatusHandler({ id, status: !isDone });
    } catch (error) {
      alert('change status fail', error.message);
    }
  }, [id, isDone, changeTodoStatusHandler]);

  return {
    id,
    isDone,
    isLoading,
    onChangeStatus,
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
