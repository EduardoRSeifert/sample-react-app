import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import GifFeed from './GifFeed';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <Link className="navbar-brand" to="/gif-feed">
              Gif Feed
            </Link>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/gif-feed" element={<GifFeed />} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
