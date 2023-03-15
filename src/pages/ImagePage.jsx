import ImageLabeler from "../components/ImageLabeler/ImageLabeler"
import { useState } from "react"
import './ImagePage.css'
import { useMediaQuery } from 'react-responsive'
import { useMemo } from "react"
import { scaleLinear } from "@visx/scale"


export default function ImagePage({ annotationData, setAnnotationData }) {
    const [savedAnnotation, setSavedAnnotation] = useState([])

    const largest = useMediaQuery({query: '(min-width: 1540px)'})
    const large = useMediaQuery({query: '(min-width: 1024px)'})
    const medium = useMediaQuery({query: '(min-width: 768px)'})
    const small = useMediaQuery({query: '(min-width: 480px)'})

    const width = largest ? 900 : large ? 850 : medium ? 600 : small ? 500 : 360;
    const height = largest ? 680 : large ? 643 : medium ? 454 : small ? 378 : 272;
    
        
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