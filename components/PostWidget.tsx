import * as React from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import { IPostWidget } from "../types";

const PostWidget = ({ categories, slug }: IPostWidget) => {
  const [relatedPosts, setRealatedPosts] = React.useState([]);

  React.useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRealatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRealatedPosts(result));
    }
  }, [slug]);

  console.log("Related Posts - ", relatedPosts);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Post" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              className="align-middle rounded-full h-full"
              height="60px"
              width="60px"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM, DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              // @ts-ignore
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
