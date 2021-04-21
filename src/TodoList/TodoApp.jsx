import { createContext, useCallback, useContext, useEffect } from 'react';
import { db } from './firebase';
import { COLLECTION } from './config';
import { disposeTodoList, setUpTodoList } from './Actions/todo.actions';
import { TodoContext } from './Contexts/todo.context';
import { TodoList } from './Components/TodoList';

const useGetTodoListFromFirebase = (collectionName) => {
  const { state, dispatch } = useContext(TodoContext);

  const getTodoListFromFirebase = useCallback(async () => {
    // isLoading true
    dispatch(setUpTodoList.start());
    try {
      const todoListDocs = await db
        .collection(collectionName)
        .orderBy('dueDate')
        .get();

      const todoList = todoListDocs.docs.map((item) => {
        return [item.id, item.data()];
      });

      // set todos
      dispatch(setUpTodoList.succeed(todoList));
    } catch (error) {
      console.log(error, error.message);
      // set Error
      dispatch(setUpTodoList.fail({ error }));
    }
  }, [dispatch]);

  return {
    ...state,
    getTodoListFromFirebase,
  };
};

const useDisposeTodoList = () => {
  const { dispatch } = useContext(TodoContext);

  const disposeTodo = useCallback(() => {
    dispatch(disposeTodoList());
  }, [dispatch]);

  return {
    disposeTodo,
  };
};

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
        </TodoListContainer>
      </TodoListProvider>
    </div>
  );
};
