import styles from "@/styles/Blog.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";

import "swiper/css";
import "swiper/css/virtual";
import { useEffect, useRef, useState } from "react";
import Card, { Detail } from "@/components/card";
import Item from "../component/item";

export default function Blog({ data }) {
  const { id } = data;

  const [sliderItems, setSliderItems] = useState([]);
  const initialIndexRef = useRef(0);

  useEffect(() => {
    initialLoad();
    window.localStorage.setItem(id, id);
  }, []);

  const initialLoad = () => {
    setTimeout(() => {
      const allBlogs = Array.from({ length: 100 }, (_, index) => index + 1);

      setSliderItems(allBlogs);
      initialIndexRef.current = +id - 1;

      console.log("Loaded");
    }, 5000);
  };

  const itemComp = <Item id={id} />;

  return (
    <div className={styles.container}>
      {sliderItems.length < 1 ? (
        itemComp
      ) : (
        <Swiper
          className={styles.fullHeight}
          virtual
          modules={[Virtual]}
          initialSlide={initialIndexRef.current}
        >
          {sliderItems.map((item) => (
            <SwiperSlide key={item} className={styles.fullHeight}>
              {item === id ? itemComp : <Item id={item} />}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
};

export const getStaticProps = async (context) => {
  const data = context.params;

  return { props: { data } };
};
