import { useCallback, useContext, useState } from 'react';
import { updateTodo } from '../Actions/todo.actions';
import { COLLECTION } from '../config';
import { TodoContext } from '../Contexts/todo.context';
import { db } from '../firebase';

export const useUpdateTodo = () => {
  const { dispatch } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const updateTodoHandler = useCallback(
    async ({ id, data }) => {
      setIsLoading(true);
      try {
        // TODO: get current todo data

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
        // TODO: rollback state
        // dispatch(changeTodoStatus({ id, status: !status }));
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
