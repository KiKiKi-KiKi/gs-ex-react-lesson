import { createContext, useContext, useEffect } from 'react';
import { COLLECTION } from './config';
import { useGetTodoListFromFirebase } from './hooks/useGetTodoListFromFirebase';
import { useDisposeTodoList } from './hooks/useDisposeTodoList';
import { TodoList } from './Components/TodoList';
import { InputForm } from './Components/InputForm';

const Loading = () => {
  return <p>Loading...</p>;
};

const Error = ({ children }) => {
  return <div className="errorContainer">{children}</div>;
};

const Context = createContext();

const TodoListProvider = ({ isLoading, error, children }) => {
  return (
    <Context.Provider value={{ isLoading, error }}>{children}</Context.Provider>
  );
};

const TodoListContainer = ({ children }) => {
  const { isLoading, error } = useContext(Context);

  if (error) {
    return (
      <Error>
        <h2>Error</h2>
        <p>{error.message}</p>
      </Error>
    );
  }

  return isLoading ? <Loading /> : children;
};

export const TodoApp = () => {
  const {
    isLoading,
    error,
    getTodoListFromFirebase,
  } = useGetTodoListFromFirebase(COLLECTION);
  const { disposeTodo } = useDisposeTodoList();

  useEffect(() => {
    getTodoListFromFirebase();

    return () => {
      // cleanup todolist
      disposeTodo();
    };
  }, []);

  return (
    <div className="todoApp">
      <h1 className="title">Firebase TODO App</h1>
      <TodoListProvider isLoading={isLoading} error={error}>
        <TodoListContainer>
          <TodoList />
          <InputForm />
        </TodoListContainer>
      </TodoListProvider>
    </div>
  );
};
