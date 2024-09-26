import { useTranslation } from "hooks";
import Image from "next/image";
import { ContentfulProduct } from "types/product";

interface Props {
  content: ContentfulProduct | null;
}

export const SupplementSection = ({ content }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex w-full flex-col items-center justify-center md:flex-row z-20">
      <div className="select-none mt-4 md:max-w-4xl md:flex-1 md:p-16">
        <Image
          src={"https:" + content?.supplementsImage?.fields.file.url}
          alt="supplements image"
          width={1500}
          height={1500}
          objectFit="contain"
          quality={100}
        />
      </div>

      <div className="mr-4 px-4 md:w-2/5 flex justify-end">
        <Image
          src={"https:" + content?.supplementFacts?.fields.file.url}
          alt="supplements image"
          width={content?.supplementFacts.fields.file.details.image.width}
          height={content?.supplementFacts.fields.file.details.image.height}
          objectFit="contain"
          quality={100}
        />
      </div>
    </div>
  );
};
