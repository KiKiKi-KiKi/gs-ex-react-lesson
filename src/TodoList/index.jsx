import { InputForm } from './Components/InputForm';
import { TodoList } from './Components/TodoList';

export const App = () => {
  return (
    <div>
      <h1>Firebase TODO App</h1>
      <TodoList />
      <InputForm />
    </div>
  );
};
