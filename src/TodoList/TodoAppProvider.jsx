import { useReducer } from 'react';
import { INITIAL_STATE } from './config';
import { TodoContext } from './Contexts/todo.context';
import { todoReducer } from './Reducers/todo.reducer';

const TodoContextProvider = ({ state, dispatch, children }) => {
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useBuildContainerProps = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);

  return {
    state,
    dispatch,
    children,
  };
};

export const TodoAppProvider = (props) => {
  return <TodoContextProvider {...useBuildContainerProps(props)} />;
};
