import styles from "@/styles/bottom.module.scss";
import { useEffect, useRef, useState } from "react";

function BottomSheet({ initialHeight, children, maxHeight = 0, isExpanded }) {
  const bottomSheetRef = useRef(null);

  const translate = (height) => {
    const translate = `calc(100% - ${height}px)`;
    bottomSheetRef.current.style.transform = `translateY(${translate})`;
  };

  const expand = () => {
    translate(maxHeight);
    bottomSheetRef.current.style.overflow = "auto";
  };

  const collapse = () => {
    bottomSheetRef.current.style.overflow = "hidden";
    translate(initialHeight);
  };

  useEffect(() => {
    if (!isExpanded) {
      collapse();
    } else {
      expand();
    }
  }, [isExpanded, maxHeight, initialHeight]);

  return (
    <div
      ref={bottomSheetRef}
      className={styles.modalBottomSheet}
      style={{
        maxHeight: `${maxHeight}px`,
      }}
    >
      {children}
    </div>
  );
}

const Slider = () => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className={styles.slider}>
      {items.map((item) => (
        <div key={item} className={styles.sliderItem}>
          Content: {item}
        </div>
      ))}
    </div>
  );
};

const BottomSheetContent = ({ height, isExpanded }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [initHeight, setInitHeight] = useState(0);

  useEffect(() => {
    const contentRect = contentRef.current.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();
    const offset = contentRect.top - titleRect.top;
    setInitHeight(offset);
  }, []);

  return (
    <BottomSheet
      initialHeight={initHeight}
      maxHeight={height}
      isExpanded={isExpanded}
    >
      <div className={styles.title} ref={titleRef}>
        Product Name
      </div>
      <div>$120.00</div>
      <div className={styles.button}>Add To Cart</div>
      <div className={styles.content} ref={contentRef}>
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

export default function Bottom() {
  const heightRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const { height } = heightRef.current.getBoundingClientRect();
    setHeight(height - 10);
  }, []);

  const onBottomSheetToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.bottom}>
      <div className={styles.bottomContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            Header
            <div className={styles.open} onClick={onBottomSheetToggle}>
              Toggle
            </div>
          </div>
          <div ref={heightRef} className={styles.body}>
            <Slider />
          </div>
        </div>
        <BottomSheetContent
          isExpanded={expanded}
          ref={bottomSheetRef}
          height={height}
        />
      </div>
    </div>
  );
}
