import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/categories">Catégories</NavLink>
          </li>
          <li>
            <NavLink to="/programs">Séries</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
