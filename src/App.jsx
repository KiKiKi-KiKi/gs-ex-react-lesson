import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Booklist } from './components/Booklist';

// React-router-dom
// https://reactrouter.com/web/api/Route

const Navigation = ({ linkList }) => {
  const links = linkList.map((link, i) => (
    <li key={link}>
      <Link to={i ? `/${link.toLowerCase()}` : '/'}>{link}</Link>
    </li>
  ));

  return <ul>{links}</ul>;
};

function App() {
  const languages = ['React', 'Vue', 'Angular'];

  return (
    <BrowserRouter>
      <div>
        <h1>React APP</h1>
        <Navigation linkList={languages} />
        <hr />
        <Route
          exact
          path="/"
          render={() => <Booklist language={languages[0]} />}
        />
        <Route
          path="/vue"
          render={() => <Booklist language={languages[1]} />}
        />
        <Route
          path="/angular"
          render={() => <Booklist language={languages[2]} />}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
