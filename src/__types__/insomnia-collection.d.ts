export type InsomniaCollection = {
  type: string;
  name: string;
  meta: CollectionMeta;
  collection: InnerCollection[];
};

export type InnerCollection = {
  name: string;
  meta: CollectionMeta;
  children: CollectionRequest[];
};

export type CollectionMeta = {
  id: string;
  created: number;
  modified: number;
  isPrivate?: boolean;
  sortKey?: number;
};

export type CollectionRequest = {
  url: string;
  name: string;
  meta: CollectionMeta;
  method: string;
  body: {
    mimeType: string;
    text: string;
  };
  headers: string[];
  authentication: RequestAuthentication;
  settings: {
    renderRequestBody: boolean;
    encodeUrl: boolean;
    followRedirects: string;
    cookies: string[];
    rebuildPath: boolean;
  };
};

export type RequestAuthentication = {
  type: string;
  token?: string;
};
