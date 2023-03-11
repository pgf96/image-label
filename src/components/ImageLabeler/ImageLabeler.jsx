import Cursor from "../Cursor/Cursor";
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageLabeler({ annotationData, setAnnotationData, height, width, unsavedAnnotation, setUnsavedAnnotation }) {

  const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"
  const [isEditable, setIsEditable] = useState(false)
  const [clickCoordinates, setClickCoordinates] = useState([]);
  // const [unsavedAnnotation, setUnsavedAnnotation] = useState([])

  const [newItem, setNewItem] = useState({
    title: '',
    x: 0,
    y: 0,
    dx: 120,
    dy: 60,
    width: 150,
    height: 75,
    id: Math.floor(Math.random() * 1000000)
  })


  const inputRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(function () {
    function getAnnotations() {
      const annotations = annotationData
      setUnsavedAnnotation(annotations)
    }
    console.log('hi')
    getAnnotations()
  }, [])


  function handleSubmit(e) {
    e.preventDefault()
    // setUnsavedAnnotation((prevData) => [...prevData, newItem]);
    setAnnotationData((prevData) => [...prevData, newItem]);
  }

  function handleChange(e) {
    setNewItem((prevData) => ({
      ...prevData,
      title: e.target.value,
      x: clickCoordinates.x,
      y: clickCoordinates.y,
    }))
  }

  function handleDragEnd({ x, y, dx, dy }, id) {
    setAnnotationData((prevData) =>
      prevData.map((annotation) =>
        annotation.id === id ? { ...annotation, x, y, dx, dy } : annotation
      )
    );
  }

  function handleAnnotationSave() {
    // setAnnotationData(unsavedAnnotation)
    setUnsavedAnnotation(annotationData)
  }

  function handleCheck() {
    setIsEditable(!isEditable)
    return isEditable
  }
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const newScaleFactor = window.innerWidth < 900 ? window.innerWidth / 900 : 1;
    setScaleFactor(newScaleFactor);
  }, [window.innerWidth]);

  return (
    <div>
      <Cursor svgRef={svgRef} inputRef={inputRef} setClickCoordinates={setClickCoordinates} setAnnotationData={setAnnotationData} />
      <div style={{ textAlign: 'left'}} >
        The mouse is at position{' '}
        <b>({clickCoordinates.x}, {clickCoordinates.y})</b>
        <div>
          <label for='edit'> edit </label>
          <input type="checkbox" name='edit' onChange={handleCheck} />
          <span>(allows you to move handles)</span>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={newItem.title}
                onChange={handleChange}
                ref={inputRef}
              />
              <button type="submit">add to unsaved annotations</button>
            </div>
          </form>
        </div>
      <button onClick={handleAnnotationSave}> save annotations </button>
      </div>

      <div style={{ position: 'absolute' }}>
        <img
          src={imageSrc}
          style={{ width: width, height: height }}
        />
        <svg
          ref={svgRef}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: width, height: height
          }}>
          {/* {unsavedAnnotation.map((annotation) => ( */}
          {annotationData.map((annotation) => (
            <EditableAnnotation
              key={annotation.id}
              x={annotation.x * scaleFactor}
              y={annotation.y * scaleFactor}
              dx={annotation.dx * scaleFactor}
              dy={annotation.dy * scaleFactor}
              width={annotation.width}
              height={annotation.height}
              canEditSubject={isEditable}
              canEditLabel={isEditable}
              onDragEnd={(coord) => handleDragEnd(coord, annotation.id,)}>
              <Connector
                stroke={'black'}
                type={'elbow'} />
              <CircleSubject
                stroke={'black'}
                radius={3} />
              <Label
                title={annotation.title}
                fontColor={'white'}
                showBackground={true}
                backgroundFill={'rgba(0, 0, 0, 0.3)'}
                anchorLineStroke={'black'}
              />
            </EditableAnnotation>
          ))}
        </svg>
      </div>
    </div>
  );
};