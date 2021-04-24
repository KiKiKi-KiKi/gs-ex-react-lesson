import { useCallback, useContext } from 'react';
import { db } from '../firebase';
import { setUpTodoList } from '../Actions/todo.actions';
import { TodoContext } from '../Contexts/todo.context';

export const useGetTodoListFromFirebase = (collectionName) => {
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
