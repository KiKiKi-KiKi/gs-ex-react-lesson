import { useCallback, useContext, useState } from 'react';
import { updateTodo } from '../Actions/todo.actions';
import { COLLECTION } from '../config';
import { TodoContext } from '../Contexts/todo.context';
import { db } from '../firebase';
import { getTodoDataById } from '../utilities';

export const useUpdateTodo = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const updateTodoHandler = useCallback(
    async ({ id, data }) => {
      setIsLoading(true);
      // get current todo data
      const currentTodoData = getTodoDataById(todos)(id);

      try {
        // update state
        dispatch(updateTodo({ id, data }));

        // Update firebase
        const res = await db
          .collection(COLLECTION)
          .doc(id)
          .update({
            ...data,
          });
        console.log(res);

        setIsLoading(false);

        return true;
      } catch (error) {
        console.log('updateTodoHandler', error.message, error);
        // rollback state
        dispatch(updateTodo({ id, data: currentTodoData }));

        setIsLoading(false);
        throw error;
      }
    },
    [dispatch],
  );

  return {
    isLoading,
    updateTodoHandler,
  };
};
