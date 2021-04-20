import { useState, useCallback } from 'react';
import { COLLECTION } from '../config';
import { db, createAtTimestamp, timestamp } from '../firebase';

export const InputForm = ({ onReloadTodoList }) => {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const updateValueHandler = useCallback(
    (callback) => (evt) => {
      const value = evt.currentTarget.value;
      typeof callback === 'function' && callback(value);
    },
    [],
  );

  const resetFormHandler = useCallback(() => {
    setTodo('');
    setDueDate('');
  }, []);

  const postDataToFirebase = useCallback(async (postData) => {
    const addedDocRef = await db.collection(COLLECTION).add(postData);

    return addedDocRef;
  }, []);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const todoTitle = todo.trim();
    if (todoTitle === '' || dueDate === '') {
      return false;
    }

    const postData = {
      todo: todoTitle,
      dueDate: timestamp(dueDate),
      isDone: false,
      createAt: createAtTimestamp(),
    };

    try {
      // DocumentReference
      const res = await postDataToFirebase(postData);
      console.log(res);
      resetFormHandler();
      onReloadTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <div>
        <label htmlFor="todo">Title</label>
        <input
          name="todo"
          type="text"
          value={todo}
          onChange={updateValueHandler(setTodo)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          name="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={updateValueHandler(setDueDate)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
