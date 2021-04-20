import dayjs from 'dayjs';
import { useCallback } from 'react';
import { COLLECTION } from '../config';
import { db } from '../firebase';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todoList,
  onUpdateStatus,
  onUpdateTodo,
  onDelete,
}) => {
  const changeStatusHandler = useCallback(
    ({ id, isDone }) => {
      console.log('> change State', id, !isDone);
      const status = !isDone;
      onUpdateStatus({ id, isDone: status });
      // update return undefined
      db.collection(COLLECTION).doc(id).update({
        isDone: status,
      });
    },
    [onUpdateStatus],
  );

  const updateHandler = useCallback(async ({ id, postData }) => {
    console.log('Update', id, postData);
    await db
      .collection(COLLECTION)
      .doc(id)
      .update({
        ...postData,
      });
    onUpdateTodo({ id, postData });
  }, []);

  const deleteHandler = useCallback(
    async (id) => {
      console.log('Delete', id);
      onDelete(id);
      // delete return undefined
      await db.collection(COLLECTION).doc(id).delete();
    },
    [onDelete],
  );

  return (
    <ul>
      {todoList?.map(([id, data]) => {
        return (
          <li key={id} id={id}>
            <TodoItem
              id={id}
              {...data}
              dueDate={dayjs(data?.dueDate.toDate()).format('YYYY-MM-DD HH:mm')}
              changeStatusHandler={changeStatusHandler}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          </li>
        );
      })}
    </ul>
  );
};
