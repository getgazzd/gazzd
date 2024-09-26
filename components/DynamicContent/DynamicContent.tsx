import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Node } from "@contentful/rich-text-types";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  content: Document;
}

const DynamicContent = ({ content }: Props) => {
  return documentToReactComponents(content, contentfulOptions) as JSX.Element;
};

export default DynamicContent;

export const contentfulOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: Node, children: ReactNode) => {
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: Node, children: ReactNode) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => {
      return (
        <>
          <p>{children}</p>
          <br />
        </>
      );
    },

    [BLOCKS.UL_LIST]: (node: Node, children: ReactNode) => {
      return <ul>{children}</ul>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Node, children: ReactNode) => {
      const { title, description, file } = node.data.target.fields;
      return (
        <div className="w-2/5 p-2">
          <Image
            alt={description}
            src={"https:" + file.url}
            width={500}
            height={300}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      );
    },
  },
};
