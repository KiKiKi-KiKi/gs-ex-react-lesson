import { useState, useEffect } from 'react';
import { db } from './firebase';

export const COLLECTION = 'todos';
/*
TODO item Schema
interface TodoItem {
  id: string;
  todo: string;
  dueDate: timestamp;
  createAt: timestamp;
}
 */

export const App = () => {
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
    <div>
      <h1>Firebase TODO App</h1>
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
    </div>
  );
};
