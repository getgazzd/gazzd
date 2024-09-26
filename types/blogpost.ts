import { Document } from "@contentful/rich-text-types";

export interface BlogPost {
  title: string;
  featuredImage: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: string;
            height: string;
          };
        };
      };
    };
  };
  body: Document;
}
