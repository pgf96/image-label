import Cursor from "../Cursor/Cursor";
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageLabeler({ annotationData, setAnnotationData, height, width, xScale, yScale, savedAnnotation, setSavedAnnotation }) {

  const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"
  const [isEditable, setIsEditable] = useState(false)
  const [clickCoordinates, setClickCoordinates] = useState([]);

  const [newItem, setNewItem] = useState({
    title: '',
    x: 0,
    y: 0,
    dx: 120,
    dy: 60,
    width: 150,
    height: 75,
    id: 1
  })

  const inputRef = useRef(null)
  const svgRef = useRef(null)
  const imageRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(function () {
    function getAnnotations() {
      const annotations = annotationData
      setSavedAnnotation(annotations)
    }
    getAnnotations()
  }, [])


  function handleCreateItem(e) {
    e.preventDefault()
    setAnnotationData((prevData) => [...prevData, newItem]);
  }

  function handleChange(e) {
    setNewItem((prevData) => ({
      ...prevData,
      title: e.target.value,
      x: clickCoordinates.x,
      y: clickCoordinates.y,
      id: Math.floor(Math.random() * 1000000),
    }))
  }

  function handleDragEnd({ x, y, dx, dy }, id) {
    setAnnotationData((prevData) =>
      prevData.map((annotation) =>
        annotation.id === id ? { ...annotation, x, y, dx, dy } : annotation
      )
    );
  }

  function handleSaveAnnotations() {
    setSavedAnnotation(annotationData)
  }

  function handleCheck() {
    setIsEditable(!isEditable)
    return isEditable
  }

  return (
    <div>
      <Cursor xScale={xScale} yScale={yScale} width={width} svgRef={svgRef} inputRef={inputRef} setClickCoordinates={setClickCoordinates} setAnnotationData={setAnnotationData} />
      <div style={{ textAlign: 'left', width: width}} >
        The mouse is at position{' '}
        <b>({(clickCoordinates.x)}, {(clickCoordinates.y)})</b>
        <div>
          <label htmlFor='edit'> edit </label>
          <input type="checkbox" name='edit' onChange={handleCheck} />
          <span>(allows you to move handles)</span>
        </div>
        <div>
          <form onSubmit={handleCreateItem}>
            <div>
              <input
                type="text"
                value={newItem.title}
                onChange={handleChange}
                ref={inputRef}
              />
              <button type="submit">add to real time annotations</button>
            </div>
          </form>
        </div>
        <button onClick={handleSaveAnnotations}> save annotations </button>
      </div>

      <div style={{ position: 'relative', width: width }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
        >
          <image ref={imageRef} href={imageSrc}
          //  width={width}
           width='100%'
           height='100%'
           />
          {/* {unsavedAnnotation.map((annotation) => ( */}
          {annotationData.map((annotation) => (
            <EditableAnnotation
              key={annotation.id}
              // coordinates are displayed based on scaling factor
              x={xScale(annotation.x)}
              y={yScale(annotation.y)}
              dx={xScale(annotation.dx)}
              dy={yScale(annotation.dy)}
              width={width}
              height={height}
              canEditSubject={isEditable}
              canEditLabel={isEditable}
              onDragEnd={({ x, y, dx, dy }) => {
                // coordinates are passed as unscaled in order to preserve the original coordinate data
                const unscaledX = xScale.invert(x)
                const unscaledY = yScale.invert(y)
                const unscaledDx = xScale.invert(dx)
                const unscaledDy = yScale.invert(dy)
                handleDragEnd({ x: unscaledX, y: unscaledY, dx: unscaledDx, dy: unscaledDy }, annotation.id);
              }}
            >
              <Connector
                stroke={'rgba(0, 0, 0, .7)'}
                type={'elbow'} />
              <CircleSubject
                stroke={'black'}
                radius={3} />
              <Label
                maxWidth={xScale(150)}
                titleFontSize={xScale(16)}
                title={annotation.title}
                fontColor={'white'}
                showBackground={true}
                backgroundFill={'rgba(0, 0, 0, 0.2)'}
                anchorLineStroke={'rgba(0, 0, 0, 0.6)'}
                backgroundPadding={xScale(12)}
              />
            </EditableAnnotation>
          ))}
        </svg>
      </div>
    </div>
  );
};