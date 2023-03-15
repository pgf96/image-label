import ImageLabeler from "../components/ImageLabeler/ImageLabeler"
import { useState, useEffect } from "react"
import './ImagePage.css'
import { useMediaQuery } from 'react-responsive'
import { ParentSize, withScreenSize } from "@visx/responsive"
import { useMemo } from "react"
import { scaleLinear } from "@visx/scale"


export default function ImagePage({ annotationData, setAnnotationData }) {


    const [savedAnnotation, setSavedAnnotation] = useState([])
    // const [width, setWidth] = useState(window.innerWidth)

    const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"

    const largest = useMediaQuery({query: '(min-width: 1540px)'})
    const large = useMediaQuery({query: '(min-width: 1024px)'})
    const medium = useMediaQuery({query: '(min-width: 768px)'})
    const small = useMediaQuery({query: '(min-width: 480px)'})

    const breakpoints = []

    let width,height
    if (largest) {
        width = 900
        height = 680
    } else if (large) {
        width = 850
        height = 643
    } else if (medium) {
        width = 600
        height = 454
    } else if (small) {
        width = 500
        height = 378
    } else {
        width = 360
        height = 272
    }
        
    const xScale = useMemo(
        () =>
          scaleLinear({
            domain: [0, 900],
            range: [0, width]
          }),
        [width]
      );
      
      const yScale = useMemo(
        () =>
          scaleLinear({
            domain: [0, 681],
            range: [0, height]
          }),
        [height]
      );

    return (
        <div className="ImagePage">
            <ImageLabeler 
            width={width} 
            height={height}  
            xScale={xScale} 
            yScale={yScale}
            savedAnnotation={savedAnnotation} 
            setSavedAnnotation={setSavedAnnotation} 
            annotationData={annotationData} 
            setAnnotationData={setAnnotationData}
            /> 
            <div className="AnnotationInfo">
                <h1> Real time annotation info</h1>
                <ul>
                    {annotationData && annotationData.map(annotation =>
                        <p>
                            {Object.keys(annotation).map(key =>
                                `${key}: ${annotation[key]}`
                            ).join(', ')}
                        </p>
                    )
                    }
                </ul>
                <h1>Saved annotation info</h1>
                <ul>
                    {savedAnnotation && savedAnnotation.map(savedA => 
                        <p>
                            {Object.keys(savedA).map(key =>
                                    `${key}: ${savedA[key]}`
                                ).join(', ')}
                        </p> 
                    )
                    }
                </ul>
            </div>
        </div>
    )
}