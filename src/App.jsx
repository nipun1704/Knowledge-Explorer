import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizStart from './pages/QuizStart';
import Quiz from './pages/Quiz';
import Gallery from './pages/Gallery';
import TimelineExplorer from './pages/TimelineExplorer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz-start" element={<QuizStart />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/timeline" element={<TimelineExplorer />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
