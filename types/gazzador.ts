export interface IGazzador {
  title: string;
  image: Image;
  link?: string;
  is_live: boolean;
}

interface Image {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

interface Metadata {
  tags: any[];
}

interface Sys {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Environment;
  revision: number;
  locale: string;
}

interface Space {
  sys: Sys2;
}

interface Sys2 {
  type: string;
  linkType: string;
  id: string;
}

interface Environment {
  sys: Sys3;
}

interface Sys3 {
  id: string;
  type: string;
  linkType: string;
}

interface Fields {
  title: string;
  file: File;
}

interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

interface Details {
  size: number;
  image: Image2;
}

interface Image2 {
  width: number;
  height: number;
}
