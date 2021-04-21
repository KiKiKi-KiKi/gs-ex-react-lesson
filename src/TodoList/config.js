/*
TODO item Schema
interface TodoItem {
  todo: string;
  isDone: boolean;
  dueDate: firestore.Timestamp;
  createAt: firestore.Timestamp;
}

interface Todo {
  id: string;
  data: TodoItem;
}
 */

export const COLLECTION = 'todos';

/*
interface State {
  todos: Todo[];
  isLoading: booleam;
  error: FirestoreError | null;
}
*/

export const INITIAL_STATE = {
  todos: [],
  isLoading: false,
};
