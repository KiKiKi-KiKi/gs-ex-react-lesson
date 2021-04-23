import { useCallback, useContext, useState } from 'react';
import { COLLECTION } from '../config';
import { db } from '../firebase';
import { changeTodoStatus, deleteTodo } from '../Actions/todo.actions';
import { TodoContext } from '../Contexts/todo.context';

export const useChangeTodoStatus = () => {
  const { dispatch } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const changeTodoStatusHandler = useCallback(
    async ({ id, status }) => {
      setIsLoading(true);
      try {
        dispatch(changeTodoStatus({ id, status }));

        // Update firebase doc
        // response: void
        await db.collection(COLLECTION).doc(id).update({
          isDone: status,
        });

        setIsLoading(false);

        return true;
      } catch (error) {
        console.log('changeTodoStatusHandler', error.message, error);
        // rollback state
        dispatch(changeTodoStatus({ id, status: !status }));
        setIsLoading(false);
        throw error;
      }
    },
    [dispatch],
  );

  const deleteTodoHandler = useCallback(
    async ({ id }) => {
      setIsLoading(true);
      try {
        // delete item from firestore
        // return void
        await db.collection(COLLECTION).doc(id).delete();

        dispatch(deleteTodo({ id }));

        return true;
      } catch (error) {
        console.log('deleteTodoHandler', error.message, error);

        setIsLoading(false);
        throw error;
      }
    },
    [dispatch],
  );

  return {
    isLoading,
    changeTodoStatusHandler,
    deleteTodoHandler,
  };
};
