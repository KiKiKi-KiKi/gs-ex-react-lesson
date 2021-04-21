export const ASYNC = 'TODO/ASYNC_START';
export const FAIL = 'TODO/ASYNC_FAIL';
export const ADD = 'TODO/ADD';
export const UPDATE = 'TODO/UPDATE';
export const DELETE = 'TODO/DELETE';

/*
TODO item Schema
interface TodoItem {
  todo: string;
  isDone: boolean;
  dueDate: firestore.Timestamp;
  createAt: firestore.Timestamp;
}

interface Todo [string, TodoItem];
// [id: string, TodoItem]

interface State {
  todos: Todo[];
  isLoading: booleam;
  error: FirestoreError | null;
}
*/

const asyncStart = () => ({
  type: ASYNC,
  payload: {},
});

/*
type asyncFailProps = {
  error: FirestoreError;
  isRollback?: boolean;
  rollbackData?: [id: string, TodoItem];
}
*/
const asyncFail = ({ error, isRollback, rollbackData }) => ({
  type: FAIL,
  payload: {
    error,
    isRollback,
    rollbackData,
  },
  error: true,
});

export const addTodo = {
  start: asyncStart,
  fail: asyncFail,
  succeed: (data) => ({
    type: ADD,
    payload: {
      ...data,
    },
  }),
};

export const changeStatusTodo = {
  start: asyncStart,
  fail: asyncFail,
  succeed: ({ id, status }) => ({
    type: UPDATE,
    payload: {
      id,
      data: {
        isDone: status,
      },
    },
  }),
};

export const updateTodo = {
  start: asyncStart,
  fail: asyncFail,
  succeed: ({ id, data }) => ({
    type: UPDATE,
    payload: {
      id,
      data: { ...data },
    },
  }),
};

export const deleteTodo = {
  start: asyncStart,
  fail: asyncFail,
  succeed: ({ id }) => ({
    type: DELETE,
    payload: { id },
  }),
};
