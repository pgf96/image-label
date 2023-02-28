import Cursor from "../Cursor/Cursor";
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageLabeler({ annotationData, setAnnotationData, height, width }) {

    const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"
    const [isEditable, setIsEditable] = useState(false)
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [unsavedAnnotation, setUnsavedAnnotation] = useState([])

    const [newItem, setNewItem] = useState({
        title: '',
        x: 0,
        y: 0,
        dx: 120,
        dy: 60,
        width: 200,
        height: 100,
        id: 3
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
        setUnsavedAnnotation((prevData) => [...prevData, newItem]);
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
        setAnnotationData(unsavedAnnotation)
    }

    function handleCheck() {
        setIsEditable(!isEditable)
        return isEditable
    }

    return (
        <div>
          <Cursor svgRef={svgRef} inputRef={inputRef} setClickCoordinates={setClickCoordinates} setAnnotationData={setAnnotationData} />
          <div>
            The mouse is at position{' '}
            <b>({clickCoordinates.x}, {clickCoordinates.y})</b>
            <div>
              <label for='edit'> edit </label>
              <input type="checkbox" name='edit' onChange={handleCheck} />
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
            <button onClick={handleAnnotationSave}> save annotations </button>
          </div>

          </div>
    
          <div style={{ position: 'absolute'}}>
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
              {unsavedAnnotation.map((annotation) => (
                <EditableAnnotation
                  key={annotation.id}
                  x={annotation.x}
                  y={annotation.y}
                  dx={annotation.dx}
                  dy={annotation.dy}
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