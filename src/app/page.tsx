import { Key, ReactElement, ReactNode, ReactPortal } from "react";

type Post = {
  id: Key | null | undefined;
  title:
    | string
    | number
    | bigint
    | boolean
    | ReactElement
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
};

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
