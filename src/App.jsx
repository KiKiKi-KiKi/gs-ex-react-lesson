import { Booklist } from './components/Booklist';

function App() {
  const languages = ['React', 'Vue', 'Angular'];

  return (
    <div>
      <h1>React APP</h1>
      {languages.map((val) => (
        <Booklist key={val} language={val} />
      ))}
    </div>
  );
}

export default App;
