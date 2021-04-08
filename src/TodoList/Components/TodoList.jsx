export const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList?.map(({ id, data }) => {
        return (
          <li key={id} id={id}>
            <input type="checkbox" value={id} />
            <span>{data.todo}</span>
            <span>DueDate: {data.dueDate.seconds}</span>
            <button type="button" value={id}>
              DELETE
            </button>
          </li>
        );
      })}
    </ul>
  );
};
