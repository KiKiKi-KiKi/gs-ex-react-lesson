import { useState, useCallback } from 'react';
import { TodoItemEditForm } from './TodoItemEditForm';

const Todo = ({
  id,
  isDone,
  onChangeMode,
  onChangeStatus,
  onDelete,
  children,
}) => {
  return (
    <div id={id}>
      <input
        type="checkbox"
        value={id}
        checked={isDone}
        onChange={onChangeStatus}
      />
      {isDone ? (
        <del>{children}</del>
      ) : (
        <span onClick={onChangeMode}>{children}</span>
      )}

      <button type="button" value={id} onClick={onDelete}>
        DELETE
      </button>
    </div>
  );
};

export const TodoItem = ({
  id,
  todo,
  dueDate,
  isDone,
  changeStatusHandler,
  updateHandler,
  deleteHandler,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const onChangeMode = useCallback(
    (mode) => () => {
      setIsEdit(mode);
    },
    [],
  );

  const onChangeStatus = useCallback(() => {
    changeStatusHandler({ id, isDone });
  }, [id, isDone]);

  const onDelete = useCallback(() => {
    if (window.confirm(`Delete ${todo}?`)) {
      deleteHandler(id);
    }
  }, [id, todo]);

  return isEdit ? (
    <TodoItemEditForm
      id={id}
      itemTodo={todo}
      itemDueDate={dueDate}
      onUpdate={updateHandler}
      onEditModeEnd={onChangeMode(false)}
    />
  ) : (
    <Todo
      id={id}
      isDone={isDone}
      onChangeMode={onChangeMode(true)}
      onChangeStatus={onChangeStatus}
      onDelete={onDelete}
    >
      <span>{todo}</span>
      <span>DueDate: {dueDate}</span>
    </Todo>
  );
};
