import './App.css';
import MathPyramid from './components/MathPyramid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Math Pyramid</h1>
        <p>Welcome to the Math Pyramid Game!</p>
      </header>
      <main className="App-main">
        <MathPyramid />
      </main>
    </div>
  );
}

export default App;
