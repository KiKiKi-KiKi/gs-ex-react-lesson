import { INITIAL_STATE } from '../config';
import {
  ASYNC,
  FAIL,
  SETUP,
  DISPOSE,
  ADD,
  UPDATE,
  DELETE,
} from '../Actions/todo.actions';

export const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASYNC: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case FAIL: {
      // TODO: rollback todolist
      // if (action.payload.isRollback) {}

      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case SETUP: {
      return {
        todos: action.payload.todos,
        isLoading: false,
        error: null,
      };
    }
    case DISPOSE: {
      return INITIAL_STATE;
    }
    case ADD: {
      return {
        ...state,
        todo: [...state.todo, [action.payload.id, action.payload.data]],
        isLoading: false,
        error: null,
      };
    }
    case UPDATE: {
      const id = action.payload.id;
      const todoListMap = new Map(state.todos);
      const item = todoListMap.get(id);

      if (!item) {
        return {
          ...state,
          isLoading: false,
          error: null,
        };
      }

      todoListMap.set(id, { ...item, ...action.payload.data });

      return {
        ...state,
        todos: [...todoListMap.entries()],
        isLoading: false,
        error: null,
      };
    }
    case DELETE: {
      const id = action.payload.id;
      const todoListMap = new Map(state.todos);

      if (!todoListMap.has(id)) {
        return {
          ...state,
          isLoading: false,
          error: null,
        };
      }

      todoListMap.delete(id);

      return {
        ...state,
        todos: [...todoListMap.entries()],
        isLoading: false,
        error: null,
      };
    }
    default: {
      // never
      return state;
    }
  }
};
