import { useCallback, useState } from 'react';
import { useChangeTodoStatus } from '../hooks/useChangeTodoStatus';
import { TodoItemEditForm } from './TodoItemEditForm';

const TodoItem = ({
  id,
  isDone,
  isLoading,
  onChangeStatus,
  onDelete,
  onChangeEditMode,
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
        {!isDone ? (
          <span onClick={onChangeEditMode}>{children}</span>
        ) : (
          <del>{children}</del>
        )}
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

const useBuildTodoProps = ({ id, isDone }) => {
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
  };
};

const TodoItemContainer = ({ todo, dueDate, onChangeEditMode, ...props }) => {
  return (
    <TodoItem onChangeEditMode={onChangeEditMode} {...useBuildTodoProps(props)}>
      <span className="todoTitle">{todo}</span>
      <span className="dueDate">
        DueDate: <time>{dueDate}</time>
      </span>
    </TodoItem>
  );
};

export const Todo = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const changeModeHandler = useCallback(
    (editModeFlg) => () => {
      setIsEdit(editModeFlg);
    },
    [],
  );

  return isEdit ? (
    <TodoItemEditForm {...props} onEditModeEnd={changeModeHandler(false)} />
  ) : (
    <TodoItemContainer {...props} onChangeEditMode={changeModeHandler(true)} />
  );
};
