import logo from './logo.svg';
import './App.css';
import ImagePage from './pages/ImagePage';
import { useState } from 'react';



function App() {

  const [annotationData, setAnnotationData] = useState([
    {
      title: 'Nintendo Switch',
      x: 253,
      y: 471,
      dx: 44,
      dy: -133.99996948242188,
      width: 200,
      height: 100,
      id: '0',
    },
    {
      title: 'Bulbasaur',
      x: 414.66,
      y: 438.66,
      dx: 328,
      dy: 138.6,
      width: 200,
      height: 100,
      id: '1',
    },
  ])
  
  return (
    <div className="App">
      <ImagePage annotationData={annotationData} setAnnotationData={setAnnotationData} />
    </div>
  );
}

export default App;
