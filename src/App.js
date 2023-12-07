import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import GifFeed from './GifFeed';
import Home from './Home';
import GifGridPage from './GifGridPage';

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
            <Link className="navbar-brand" to="/gif-grid">
              Gif Grid
            </Link>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/gif-feed" element={<GifFeed />} />
            <Route path="/" element={<Home/>} />
            <Route path="/gif-grid" element={<GifGridPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
