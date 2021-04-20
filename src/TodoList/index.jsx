import { useCallback, useEffect, useState } from 'react';
import { InputForm } from './Components/InputForm';
import { TodoList } from './Components/TodoList';
import { db } from './firebase';
import { COLLECTION } from './config';

/*
  todoList = [
    [id, todoItem]
  ]
*/
export const App = () => {
  const [todoList, setTodoList] = useState(null);

  const getTodoFromFirebase = useCallback(async () => {
    const itemListArray = await db
      .collection(COLLECTION)
      .orderBy('dueDate')
      .get();

    const todos = itemListArray.docs.map((item) => {
      return [item.id, item.data()];
    });
    setTodoList(todos);

    return todos;
  }, []);

  const changeTodoStatus = useCallback(({ id, isDone }) => {
    setTodoList((todoList) => {
      const todoListMap = new Map(todoList);
      const item = todoListMap.get(id);
      if (!item) {
        return todoList;
      }

      // update
      todoListMap.set(id, { ...item, isDone });
      const newTodoList = [...todoListMap.entries()];

      return newTodoList;
    });
  }, []);

  const updateTodo = useCallback(({ id, postData }) => {
    setTodoList((todoList) => {
      const todoListMap = new Map(todoList);
      const item = todoListMap.get(id);
      if (!item) {
        return todoList;
      }

      // update
      todoListMap.set(id, { ...item, ...postData });
      const newTodoList = [...todoListMap.entries()];

      return newTodoList;
    });
  }, []);

  const deleteTodoFromList = useCallback((id) => {
    setTodoList((todoList) => {
      const todoListMap = new Map(todoList);
      if (!todoListMap.has(id)) {
        return todoList;
      }

      // delete
      todoListMap.delete(id);
      const newTodoList = [...todoListMap.entries()];

      return newTodoList;
    });
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
      <TodoList
        todoList={todoList}
        onUpdateStatus={changeTodoStatus}
        onUpdateTodo={updateTodo}
        onDelete={deleteTodoFromList}
      />
      <InputForm onReloadTodoList={getTodoFromFirebase} />
    </div>
  );
};
