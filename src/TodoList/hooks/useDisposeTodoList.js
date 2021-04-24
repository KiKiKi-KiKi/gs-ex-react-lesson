import { useCallback, useContext } from 'react';
import { disposeTodoList } from '../Actions/todo.actions';
import { TodoContext } from '../Contexts/todo.context';

export const useDisposeTodoList = () => {
  const { dispatch } = useContext(TodoContext);

  const disposeTodo = useCallback(() => {
    dispatch(disposeTodoList());
  }, [dispatch]);

  return {
    disposeTodo,
  };
};
