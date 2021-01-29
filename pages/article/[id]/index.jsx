import { useRouter } from "next/router";
import Link from "next/link";
import articleStyles from "../../../styles/Article.module.css";
import { server } from "../../../config/index";
import Meta from "../../../component/Meta";

const article = ({ article }) => {
  //   const router = useRouter();
  //   const { id } = router.query;
  return (
    <>
      <Meta title={article.title} />
      <div className={articleStyles.card}>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <br />
      </div>
      <Link href="/">Go Back</Link>
    </>
  );
};

export default article;

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({
    params: {
      id: id.toString(),
    },
  }));
  console.log(ids);

  return {
    paths,
    fallback: false,
  };
}

// export async function getStaticProps(context) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({
//     params: {
//       id: id.toString(),
//     },
//   }));
//   console.log(ids);

//   return {
//     paths,
//     fallback: false,
//   };
// }
