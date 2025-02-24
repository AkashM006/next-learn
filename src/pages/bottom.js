import styles from "@/styles/bottom.module.scss";
import { useEffect, useRef, useState } from "react";

function BottomSheet({ children, maxHeight = 0, top = 1 }) {
  const bottomSheetRef = useRef(null);

  const startY = useRef(0);
  const newY = useRef(0);

  const oldScroll = useRef(0);
  const newScroll = useRef(0);

  const topReached = useRef(false);

  const isExpandedRef = useRef(false);

  const [initialHeight, setInitialHeight] = useState(0);

  const translate = (offset) => {
    bottomSheetRef.current.style.transform = `translateY(-${offset}px)`;
  };

  const disableScroll = () => {
    bottomSheetRef.current.style.overflow = "hidden";
  };

  const enableScroll = () => {
    bottomSheetRef.current.style.overflow = "auto";
  };

  const translateExpand = () => {
    const maxTranslate = maxHeight - initialHeight;
    newY.current = maxTranslate;
    startY.current = maxTranslate;
    translate(maxTranslate);

    isExpandedRef.current = true;
    topReached.current = true;

    enableScroll();

    document.documentElement.style.overflow = "none";
    document.documentElement.style.overscrollBehaviorY = "none";
  };

  const translateCollapse = () => {
    translate(0);
    newY.current = 0;
    startY.current = 0;

    isExpandedRef.current = false;

    disableScroll();

    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overscrollBehaviorY = "auto";
  };

  const transitionInit = () => {
    if (bottomSheetRef.current) {
      const parent = bottomSheetRef.current.offsetParent;
      const parentHeight = parent.offsetHeight;
      setInitialHeight(parentHeight * (1 - top));
    }
    setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.style.transitionDuration = "150ms";
      }
    }, 0);
  };

  useEffect(() => {
    transitionInit();
  }, [bottomSheetRef]);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    oldScroll.current = e.touches[0].clientY;

    topReached.current = bottomSheetRef.current.scrollTop === 0;
  };

  const onTouchMove = (e) => {
    const { clientY } = e.touches[0];
    const maxTranslate = maxHeight - initialHeight;

    newScroll.current = e.touches[0].clientY;

    if (isExpandedRef.current && bottomSheetRef.current.scrollTop > 0) return;

    const temp = newY.current + startY.current - clientY;
    if (temp > maxTranslate || temp < 0) return;

    const isMovingDown = temp < newY.current;

    if (isMovingDown) {
      disableScroll();
    }

    newY.current += startY.current - clientY;
    startY.current = clientY;

    requestAnimationFrame(() => {
      translate(newY.current);
    });
    oldScroll.current = newScroll.current;
  };

  const onTouchEnd = (e) => {
    const minOffset = 25;
    if (!isExpandedRef.current) {
      if (newY.current < minOffset) {
        translateCollapse();
      } else {
        translateExpand();
      }
    } else {
      const maxTranslate = maxHeight - initialHeight;
      if (newY.current - maxTranslate < -minOffset) translateCollapse();
      else {
        translateExpand();
      }
    }
  };

  return (
    <div
      ref={bottomSheetRef}
      className={`${styles.modalBottomSheet} swiper-no-swiping`}
      style={{
        maxHeight: `${maxHeight}px`,
        top: `${top * 100}%`,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}

const Slider = ({ paddingBottom }) => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div
      className={styles.slider}
      style={{
        paddingBottom: `${Math.round(paddingBottom)}px`,
      }}
    >
      {items.map((item) => (
        <div key={item} className={styles.sliderItem}>
          Content: {item}
        </div>
      ))}
    </div>
  );
};

const BottomSheetContent = ({ maxHeight }) => {
  return (
    <BottomSheet maxHeight={maxHeight} top={0.7}>
      <div className={styles.title}>Product Name</div>
      <div>$120.00</div>
      <div className={styles.button}>Add To Cart</div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non est
        vitae risus interdum vestibulum non vitae nulla. Integer mollis nibh id
        dolor varius interdum. In eget tincidunt enim. Nam ac finibus ligula.
        Aliquam viverra magna non felis aliquet tempor. Duis ac purus non tellus
        viverra luctus. Nam posuere arcu ac pulvinar ullamcorper. Sed sit amet
        sollicitudin libero, sit amet convallis risus. Vestibulum sed dignissim
        urna. Morbi ornare pulvinar elementum. Vestibulum auctor auctor mauris
        nec volutpat. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Maecenas vitae purus lobortis ipsum congue posuere. Fusce elit
        nibh, posuere ut tristique at, sodales in lectus. Curabitur vitae
        aliquet metus, et congue odio. Proin scelerisque vel neque feugiat
        tempus. Nullam hendrerit magna in nunc tempus efficitur. Etiam lobortis
        fringilla nunc ac dictum. Nam lectus velit, lobortis tincidunt tortor
        nec, imperdiet tristique lacus. Integer dictum nisi mauris, vel auctor
        dui vehicula nec. Nam tortor libero, egestas sed purus in, scelerisque
        molestie tortor. Pellentesque a sem pharetra odio sagittis varius.
        Maecenas porttitor nisi sit amet erat fringilla consequat. Pellentesque
        ut erat eu nibh maximus venenatis sit amet ac mi. Sed condimentum magna
        vel rutrum hendrerit. Vivamus metus nibh, dignissim congue porttitor
        nec, pharetra ac purus. Aenean in risus id ligula dapibus molestie.
        Proin et nisi nulla. Vestibulum risus libero, luctus non facilisis sit
        amet, fringilla non velit. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Etiam facilisis
        ultrices tristique. Vestibulum pellentesque ultrices nisi ac blandit.
        Proin efficitur nisl eget mi maximus, ac tempus lectus ornare. Nulla
        fermentum diam eu lorem rhoncus varius. Praesent facilisis turpis lorem,
        nec lacinia risus sagittis id. Fusce aliquam odio a turpis gravida
        mattis. Etiam finibus libero at laoreet fermentum. Vivamus non nisl vel
        dui finibus lacinia a eget quam. Aliquam egestas ultricies ex id
        vulputate. Nulla mi ex, rhoncus ullamcorper lectus non, venenatis
        tristique odio. Proin congue euismod tristique. Nunc non eros vel lectus
        feugiat aliquet ut vel dui. In dignissim pellentesque nibh ac hendrerit.
        Mauris vitae ex a nisl placerat ultricies. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </div>
    </BottomSheet>
  );
};

export default function Item({ id }) {
  const heightRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const { height } = heightRef.current.getBoundingClientRect();
    setHeight(height - 10);
  }, []);

  return (
    <div className={styles.bottom}>
      <div className={styles.bottomContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            Header: {id}
            <div className={styles.open}>Toggle</div>
          </div>
          <div ref={heightRef} className={styles.body}>
            <Slider paddingBottom={0} />
          </div>
        </div>
        <BottomSheetContent maxHeight={height} />
      </div>
    </div>
  );
}
