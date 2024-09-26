import React from "react";
import { BlogPost as IBlogPost } from "types/blogpost";
import BlogCard from "./BlogCard/BlogCard";

interface BlogPost {
  fields: IBlogPost;
}

interface Props {
  blogposts: BlogPost[];
}

const BlogPosts = ({ blogposts }: Props) => {
  return (
    <div className="mx-auto grid w-4/5 grid-cols-1 gap-6 px-6 md:grid-cols-2">
      {blogposts?.map((blogPost, index) => (
        <BlogCard key={index} {...blogPost.fields} />
      ))}
    </div>
  );
};

export default BlogPosts;
