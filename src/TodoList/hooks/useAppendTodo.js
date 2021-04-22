import { useCallback, useContext, useState } from 'react';
import { COLLECTION } from '../config';
import { createAtTimestamp, db, timestamp } from '../firebase';
import { addTodo } from '../Actions/todo.actions';
import { TodoContext } from '../Contexts/todo.context';

export const useAppendTodo = () => {
  const { dispatch } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const appendTodoHandler = useCallback(
    async ({ todoTitle, dueDate }) => {
      setIsLoading(true);
      try {
        const postData = {
          todo: todoTitle,
          dueDate: timestamp(dueDate),
          isDone: false,
          createAt: createAtTimestamp(),
        };

        // Add data to firestore
        const res = await db.collection(COLLECTION).add(postData);
        console.log('appendTodo', res, res.id);

        dispatch(
          addTodo({
            id: res.id,
            data: { ...postData },
            createAt: null,
          }),
        );

        setIsLoading(false);

        return true;
      } catch (error) {
        console.log('appendTodoHandler', error.message, error);
        setIsLoading(false);
        throw error;
      }
    },
    [dispatch],
  );

  return {
    isLoading,
    appendTodoHandler,
  };
};
