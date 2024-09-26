import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [documentSize, setDocumentSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setDocumentSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDocumentSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
  }, []);
  return { windowSize, documentSize };
};
