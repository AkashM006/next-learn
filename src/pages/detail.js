import styles from "@/styles/Detail.module.css";
import { useRef, useState } from "react";

export default function Detail() {
  const isDragging = useRef(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const onTouchStart = (e) => {
    e.preventDefault();
    isDragging.current = true;

    const { clientX, clientY } = e;

    console.log("Client: ", e);

    setPosition({
      x: clientX,
      y: clientY,
    });
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
  };

  const onTouchEnd = (e) => {
    isDragging.current = false;
  };

  return <div className={styles.body}>body</div>;

  //   return (
  //     <div className={styles.body}>
  //       <div
  //         className={styles.box}
  //         onTouchStart={onTouchStart}
  //         onTouchMove={onTouchMove}
  //         onTouchEnd={onTouchEnd}
  //         style={{
  //           position: "absolute",
  //           left: position.x,
  //           right: position.y,
  //         }}
  //       >
  //         Drag me
  //       </div>
  //     </div>
  //   );
}
