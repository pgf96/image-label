import logo from './logo.svg';
import './App.css';
import ImagePage from './pages/ImagePage';
import { useState } from 'react';



function App() {

  const [annotationData, setAnnotationData] = useState([
    {
      title: 'Nintendo Switch',
      x: 100,
      y: 471,
      dx: -1,
      dy: -123.99,
      width: 150,
      height: 175,
      id: '0',
    },
    {
      title: 'Bulbasaur',
      x: 374.66,
      y: 438.66,
      dx: -137,
      dy: 106.6,
      width: 150,
      height: 75,
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
