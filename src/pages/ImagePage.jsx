import ImageLabeler from "../components/ImageLabeler/ImageLabeler"
import './ImagePage.css'


export default function ImagePage({ annotationData, setAnnotationData }) {

    const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"
    const width = '57vw'
    const height = '81vh'

    return (
        <div className="ImagePage">
            <ImageLabeler width={width} height={height} annotationData={annotationData} setAnnotationData={setAnnotationData} />
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
        </div>
    )
}