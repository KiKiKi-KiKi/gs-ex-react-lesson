import { useState, useCallback } from 'react';
import { COLLECTION } from '../config';
import { createAtTimestamp, db } from '../firebase';

export const InputForm = () => {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const updateValueHandler = useCallback(
    (callback) => (evt) => {
      const value = evt.currentTarget.value.trim();
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
    if (todo === '' || dueDate === '') {
      return false;
    }

    const postData = {
      todo,
      dueDate,
      isDone: false,
      createAt: createAtTimestamp(),
    };

    try {
      const res = await postDataToFirebase(postData);
      console.log(res);
      resetFormHandler();
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
