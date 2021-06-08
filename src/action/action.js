import { useEffect, useRef } from "react";

const Action = (callback, delay) => {
  const snakeSavedCallback = useRef();
  useEffect(() => {
    snakeSavedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      snakeSavedCallback.current();
    }
    if (delay !== null) {
      let tickId = setInterval(tick, delay);
      return () => clearInterval(tickId);
    }
  }, [delay]);
};
export default Action;
