import { useEffect } from "react";

export default function Cursor({setClickCoordinates, inputRef, svgRef}) {
    function handleMouseClick(e) {
        // if the focused element is the input do nothing
        if (document.activeElement === inputRef.current) {
            return;
          }
        if (!svgRef.current.contains(e.target)) {
            console.log('click outside')
            return
        } else {
            console.log('click inside')
            const imageRect = svgRef.current.getBoundingClientRect();
            setClickCoordinates((prevState) => ({
            ...prevState, 
            x: e.clientX - imageRect.left,
            y: e.clientY - imageRect.top 
        }))
        // last event of the click is to focus on input element
        inputRef.current.focus()
        }
        
    };

    useEffect(() => {
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener(
        'click',
        handleMouseClick
      );
    };
  }, []);
  return (
    null
  );
}