import {
  getAllContentfulProducts,
  getSingleContentfulProduct,
} from "store/transfer/contentful";
import {
  ContentfulProduct,
  Product,
  ProductResponse,
  ProductsResponse,
} from "types/product";

/**
 * Merge products takes one argument, centraProducts
 * It fetches all product data from centra
 * and merges the two data sets to one single product
 * @params centraProducts: ProductsResponse
 * @returns Product[]
 */
export const mergeProducts = async (centraProducts: ProductsResponse) => {
  let slugs = centraProducts.products.map((product: Product) => product.uri);
  const contentfulProducts = await getAllContentfulProducts(
    "en-US",
    slugs as string[]
  );

  const products = centraProducts.products.map((centraProduct: Product) => {
    const contentfulProduct = contentfulProducts.find(
      (contentfulProduct: ContentfulProduct) =>
        contentfulProduct.slug === centraProduct.uri
    );

    //@ts-ignore
    const contentfulRelatedProducts = centraProduct?.relatedProducts?.map(
      (centraRelatedProduct: Product) => {
        const match = contentfulProducts.find(
          (contentfulRelatedProduct: ContentfulProduct) =>
            contentfulRelatedProduct.slug === centraRelatedProduct.uri
        );
        return match;
      }
    );
    //@ts-ignore
    centraProduct.relatedProducts.map((relatedProduct: Product, index) => {
      relatedProduct.contentfulProduct =
        contentfulRelatedProducts[index] ?? null;
    });
    const product: Product = {
      ...centraProduct,
      contentfulProduct:
        contentfulProduct ?? (null as unknown as ContentfulProduct),
    };

    return product;
  });
  return products;
};

export const mergeProduct = async (centraProduct: ProductResponse) => {
  const contentfulProduct = await getSingleContentfulProduct(
    "en-US",
    centraProduct.product.uri
  );
  //@ts-ignore
  const relatedProductUris = centraProduct.product.relatedProducts.map(
    (product: Product) => product.uri
  );
  const relatedProducts = await getAllContentfulProducts(
    "en-US",
    relatedProductUris
  );

  //@ts-ignore
  centraProduct.product.relatedProducts.map(
    (relatedProduct: Product, index: number) => {
      relatedProduct.contentfulProduct = relatedProducts[index];
    }
  );
  const product: Product = {
    ...centraProduct.product,
    contentfulProduct:
      contentfulProduct ?? (null as unknown as ContentfulProduct),
  };
  return product;
};
