import { Link } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/quiz-start">Quiz</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
