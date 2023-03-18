import { useEffect } from "react";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }
  }, []);
}
export default useOutsideClick;
