import { Dialog } from "@headlessui/react";
import { useTranslation } from "hooks";
import Image, { StaticImageData } from "next/image";
import hoodie from "public/sizeguides/hoodie-size.webp";
import pants from "public/sizeguides/pants-size.webp";
import tshirt from "public/sizeguides/tshirt-size.webp";
import { useState } from "react";
import { Product } from "types";

import Icon from "components/Shared/Icon";

interface Props {
  product: Product;
}

const SizeGuide = ({ product }: Props) => {
  const { t } = useTranslation();
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const guideSrc = getGuide[product?.uri as string];
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="my-3 flex items-center space-x-1 cursor-pointer"
      >
        <Icon type="length" height={20} width={20} />
        <h5>{t("size guide")}</h5>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl w-screen md:w-[50vw] h-auto">
            <Dialog.Title>
              <h4>Sizeguide for {product.name}</h4>
            </Dialog.Title>
            <Image
              src={guideSrc}
              alt="sizeguide"
              layout="responsive"
              objectFit="cover"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SizeGuide;

const getGuide: Record<string, StaticImageData> = {
  "hoodie-bb": hoodie,
  "pants-bb": pants,
  "tshirt-bb": tshirt,
};
