import { useEffect } from "react";

export default function Cursor({ setClickCoordinates, inputRef, svgRef, xScale, yScale}) {
  function handleMouseClick(e) {
    // if the focused element is the input do nothing
    if (document.activeElement === inputRef.current) {
      return;
    }
    if (!svgRef.current.contains(e.target)) {
      return
    } else {
      const imageRect = svgRef.current.getBoundingClientRect();
      setClickCoordinates((prevState) => ({
        ...prevState,
        x: Number(xScale.invert(e.clientX - imageRect.left).toFixed(3)),
        y: Number(yScale.invert(e.clientY - imageRect.top).toFixed(3))
      }))
      // last event of the click is to focus on input element
      console.log(xScale(1))
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
  }, [xScale]);
}