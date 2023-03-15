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
        x: xScale.invert(e.clientX - imageRect.left),
        y: yScale.invert(e.clientY - imageRect.top)
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