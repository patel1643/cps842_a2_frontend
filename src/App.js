import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Sample from './pages/Sample';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost normal-case text-xl">CPS842</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
      <li><Link to={'/'}>Home</Link></li>
      <li><Link to={'/sample'}>Sample</Link></li>
    </ul>
  </div>
</div>
        <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/sample" element={ <Sample/> } />
      </Routes>
      
      <Outlet />
    </div>
  );
}

export default App;
