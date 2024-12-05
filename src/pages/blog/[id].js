import { useRouter } from "next/router";
import styles from "@/styles/Blog.module.css";

export default function Blog({ data }) {
  const { id } = data;

  return <div className={styles.container}>Blog: {id}</div>;
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
