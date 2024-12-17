import { fetchBlog } from "@/services/blog";
import styles from "@/styles/Card.module.css";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

export default function Card({ id, index }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const swiper = useSwiper();

  useEffect(() => {
    const localData = window.localStorage.getItem(id);
    if(localData) {
      setData(JSON.parse(localData))
      setLoading(false)
      return;
    }
    setTimeout(() => {
      const result = fetchBlog(id);
      setData(result);
      setLoading(false)
      window.localStorage.setItem(id, JSON.stringify(result));
    },3000)

    return () => {
      window.localStorage.removeItem(id);
    }
  }, []);

  useEffect(() => {
    // if(swiper.activeIndex === index && loading) {
    //   swiper.swip
    // }
    console.log("Direction: ", swiper.swipeDirection)
  },[swiper])

  if (loading)
    return <div className={styles.container}>Loading...</div>;

  if(!data)
    return <div className={styles.container}>No Data</div>

  return <Detail id={id} data={data} />
}

const Header = ({data}) => {
  return <div className={styles.header}>
    Blog: {data}
  </div>
}

const Slider = ({data}) => {
  const items = Array.from({length: 5}, (_, index) => index+1);

  return <div className={styles.slider}>
    {
      items.map(item => <div key={item} className={styles.sliderItem}>Blog: {data} - {item}</div>)
    }
  </div>
}

const Description = ({data}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mouseDown = () => {
    console.log("hello")
    alert("Hey")
  }

  return <div onMouseDown={mouseDown} className={styles.description}>
    <div className={styles.tray} />
    Blog Data: {data}
    <p className={styles.descriptionContent}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
    </p>
  </div>
}

const Body = ({data}) => {
  return <div className={styles.body}>
    <Slider data={data} />
    <Description data={data} />
  </div>
}

export const Detail = ({data, id}) => {
  return <div className={styles.detail}>
    <Header data={id} />
    <Body data={data} />
  </div>
}