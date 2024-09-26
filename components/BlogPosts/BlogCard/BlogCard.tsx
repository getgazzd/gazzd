import Image from "next/image";

import { BlogPost as IBlogPost } from "types/blogpost";
const BlogCard = ({ title, featuredImage }: IBlogPost) => {
  return (
    <div>
      <h1 className="leading-tight">{title}</h1>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        alt={title}
        height={featuredImage.fields.file.details.image.height}
        width={featuredImage.fields.file.details.image.width}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
};

export default BlogCard;
