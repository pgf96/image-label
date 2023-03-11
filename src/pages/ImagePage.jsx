import ImageLabeler from "../components/ImageLabeler/ImageLabeler"
import { useState, useEffect } from "react"
import './ImagePage.css'
import { useMediaQuery } from 'react-responsive'
import { withScreenSize } from "@visx/responsive"


export default function ImagePage({ annotationData, setAnnotationData }) {


    const [unsavedAnnotation, setUnsavedAnnotation] = useState([])
    // const [width, setWidth] = useState(window.innerWidth)

    const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1024px)'
      
    })
    let width, height
    if (isDesktopOrLaptop) {
        width = '900px'
        height = '100%'
    } else {
        width = '760px'
        height = '100%'
    }

    // let height = '100%'
    // useEffect(function() {
    //     function getWidth() {
    //         setWidth(window.innerWidth)
    //         console.log(width)
    //     }
    //     window.addEventListener('resize', getWidth)

    //     return () =>window.removeEventListener('resize', getWidth)
    // },[])


    return (
        <div className="ImagePage">
            {width && (<ImageLabeler width={width} height={height} unsavedAnnotation={unsavedAnnotation} setUnsavedAnnotation={setUnsavedAnnotation} annotationData={annotationData} setAnnotationData={setAnnotationData} />)}
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
                    {unsavedAnnotation && unsavedAnnotation.map(unsavedA => 
                        <p>
                            {Object.keys(unsavedA).map(key =>
                                    `${key}: ${unsavedA[key]}`
                                ).join(', ')}
                        </p> 
                    )
                    }
                </ul>
            </div>
        </div>
    )
}