import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { COLLECTION } from '../config';

export const TodoList = () => {
  const [todoList, setTodoList] = useState(null);

  const getTodosFromFirebase = async () => {
    const itemListArray = await db
      .collection(COLLECTION)
      .orderBy('createAt')
      .get();

    const todos = itemListArray.docs.map((item) => {
      return {
        id: item.id,
        data: item.data(),
      };
    });
    setTodoList(todos);

    return todos;
  };

  useEffect(() => {
    getTodosFromFirebase();
  }, []);

  console.log({ todoList });

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
