export const TodoItem = ({
  id,
  todo,
  dueDate,
  isDone,
  changeStatusHandler,
  deleteHandler,
}) => {
  const onChangeStatus = () => {
    changeStatusHandler({ id, isDone });
  };

  const onDelete = () => {
    if (window.confirm(`Delete ${todo}?`)) {
      deleteHandler(id);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        value={id}
        checked={isDone}
        onChange={onChangeStatus}
      />
      {isDone ? (
        <del>
          <span>{todo}</span>
          <span>DueDate: {dueDate}</span>
        </del>
      ) : (
        <span>
          <span>{todo}</span>
          <span>DueDate: {dueDate}</span>
        </span>
      )}

      <button type="button" value={id} onClick={onDelete}>
        DELETE
      </button>
    </div>
  );
};
