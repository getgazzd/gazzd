import { Document } from "@contentful/rich-text-types";

import BlogPost from "components/BlogPosts/BlogPost/BlogPost";
import BlogPosts from "components/BlogPosts/BlogPosts";
import FAQList from "components/FAQList";
import HeroProduct from "components/HeroProduct";
import SubHeroProducts from "components/HeroProduct/SubHeroProducts";

import DynamicContent from "../components/DynamicContent/";

export interface ContentfulResponse {
  content: Content[];
  title: string;
  slug: string;
  pageBackground?: {
    fields: { file: { url: string } };
  };
}

interface Content {
  sys: {
    contentType: {
      sys: {
        id: "dynamicContent" | "faqList";
      };
    };
  };
  fields: {
    inputLabel: string;
    emailLabel: string;
    submitText: string;
    title: string;
    text: string;
    content: Document;
    sys: {
      id: string;
    };
  };
}

const componentMapping = {
  faqList: FAQList,
  dynamicContent: DynamicContent,
  blogPosts: BlogPosts,
  blogPost: BlogPost,
  heroProduct: HeroProduct,
  subheroProducts: SubHeroProducts,
};

export const renderContentfulComponent = (content: Content) => {
  const contentType = content.sys?.contentType?.sys?.id;
  const MappedComponent = componentMapping[contentType];

  if (MappedComponent && typeof content.fields === "object")
    return (
      <div key={contentType}>
        <MappedComponent {...content.fields} />
      </div>
    );
};
