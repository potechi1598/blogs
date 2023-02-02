// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog }) {
  console.log(process.env.DOMAIN_SERVICE);
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// return対象であるblogが上記Home関数の引数になっている
// ビルド時にデータのfetchが行われる
// bundle.jsには入らない部分
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return {
    props: {
      blog: data.contents,
    },
  };
};
