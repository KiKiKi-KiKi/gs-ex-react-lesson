import { useCallback, useEffect, useState } from 'react';
import { InputForm } from './Components/InputForm';
import { TodoList } from './Components/TodoList';
import { db } from './firebase';
import { COLLECTION } from './config';

export const App = () => {
  const [todoList, setTodoList] = useState(null);

  const getTodoFromFirebase = useCallback(async () => {
    const itemListArray = await db
      .collection(COLLECTION)
      .orderBy('dueDate')
      .get();

    const todos = itemListArray.docs.map((item) => {
      return {
        id: item.id,
        data: item.data(),
      };
    });
    setTodoList(todos);

    return todos;
  }, []);

  useEffect(() => {
    getTodoFromFirebase();

    return () => {
      setTodoList(null);
    };
  }, []);

  console.log({ todoList });

  return (
    <div>
      <h1>Firebase TODO App</h1>
      <TodoList todoList={todoList} />
      <InputForm onReloadTodoList={getTodoFromFirebase} />
    </div>
  );
};
