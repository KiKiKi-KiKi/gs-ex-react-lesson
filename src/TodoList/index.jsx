import { TodoAppProvider } from './TodoAppProvider';
import { TodoApp } from './TodoApp';

export const App = () => {
  return (
    <TodoAppProvider>
      <TodoApp />
    </TodoAppProvider>
  );
};
