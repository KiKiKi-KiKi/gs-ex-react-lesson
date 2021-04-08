import dayjs from 'dayjs';
import { useCallback } from 'react';
import { COLLECTION } from '../config';
import { db } from '../firebase';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todoList, onReloadTodoList }) => {
  const changeStatusHandler = useCallback(async ({ id, isDone }) => {
    console.log('> change State', id, isDone);
    // update return undefined
    await db.collection(COLLECTION).doc(id).update({
      isDone: !isDone,
    });
    onReloadTodoList();
  }, []);

  const deleteHandler = useCallback(async (id) => {
    console.log('Delete', id);
    // delete return undefined
    await db.collection(COLLECTION).doc(id).delete();
    onReloadTodoList();
  }, []);

  return (
    <ul>
      {todoList?.map(({ id, data }) => {
        return (
          <li key={id} id={id}>
            <TodoItem
              id={id}
              {...data}
              dueDate={dayjs(data.dueDate.seconds).format('YYYY-MM-DD H:mm:ss')}
              changeStatusHandler={changeStatusHandler}
              deleteHandler={deleteHandler}
            />
          </li>
        );
      })}
    </ul>
  );
};
