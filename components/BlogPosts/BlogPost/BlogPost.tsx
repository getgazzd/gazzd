import DynamicContent from "components/DynamicContent/DynamicContent";
import Image from "next/image";
import { BlogPost as IBlogPost } from "types/blogpost";

const BlogPost = ({ title, featuredImage, body }: IBlogPost) => {
  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <h1>{title}</h1>
      {featuredImage && (
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          alt="blog image"
          layout="responsive"
          objectFit="cover"
        />
      )}
      <div>
        <DynamicContent content={body} />
      </div>
    </div>
  );
};

export default BlogPost;
