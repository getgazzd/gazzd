import { Document } from "@contentful/rich-text-types";
import { components } from "generatedTypes";
import { Component } from "react";
import { Item } from "types/cart";

export type Product = components["schemas"]["ProductModel"] & {
  contentfulProduct: ContentfulProduct;
  media?: {
    standard?: string[];
    large?: string[];
    "1200x1200": string[];
  };
};

export type RelatedProduct = components["schemas"]["RelatedProductModel"];

type TableOfContent = {
  fields: {
    contentDescription: string;
  };
};

export interface ContentfulProduct {
  title: string;
  centraId: string;
  barcodeLink: string;
  barcode: string;
  slug: string;
  collectionName: string;
  servings: string;
  fields: Record<any, any>;
  productDescription: Document;
  tableOfContent: TableOfContent[];
  pageBackground: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
  vectorBackground: { fields: { file: { url: string } } };
  supplementsImage: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
  supplementFacts: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
  accentColor: string;
  extraInformation: string;
  pricePerServing: string;
  quantityPicker: boolean;
  colorPicker: boolean;
  sizePicker: boolean;
  merchDetails: Document;
}

export interface ProductsResponse {
  token: string;
  products: Product[];
  filter: Filter[];
}

export interface ProductResponse {
  token: string;
  product: Product;
}

export interface Filter {
  field: FilterFields;
  values: Value[];
}

interface Value {
  count: number;
  data: {
    category: string;
    metaDescription: string;
    metaKeywords: string;
    metaTitle: string;
    name: string;
    uri: string;
  };
  filterCount: number;
  totalCount: number;
  value: string;
}

// Used when querying Products
// Filters etc

interface Params {
  skipFirst?: number;
  search?: string;
  limit?: number;
  market?: string;
}

export type ProductParams = Params & Partial<Filters>;

export interface Filters {
  brands: string[];
  categories: string[];
  collections: string[];
}

export type FilterFields = keyof Filters;

export interface HeroProductType {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  heroImage: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
}

export interface SubProduct {
  fields: {
    buttonLink: string;
    buttonText: string;
    description: Document;
    product: [
      {
        fields: {
          slug: string;
        };
      }
    ];
  };
}
