export type InsomniaCollection = {
  type?: string;
  name?: string;
  meta?: CollectionMeta;
  collection?: InnerCollection[];
  _type?: string;
  __export_format?: number;
  __export_date?: string;
  __export_source?: string;
  resources?: AsaasResource[];
  environments?: Array<{data: Record<string, string>}>;
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

export type AsaasResource = {
  _id: string;
  parentId?: string;
  modified: number;
  created: number;
  url: string;
  name: string;
  description?: string;
  method?: string;
  body?: {
    mimeType: string;
    text: string;
    params?: {
      type: string;
      name: string;
      disabled: boolean;
      value?: string;
      fileName?: any[];
    }[];
  };
  parameters?: {
    id?: string;
    name: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }[];
  headers?: {
    name: string;
    value: string;
    id?: string;
  }[];
  authentication?: RequestAuthentication;
  metaSortKey?: number;
  isPrivate?: boolean;
  settingStoreCookies?: boolean;
  settingSendCookies?: boolean;
  settingDisableRenderRequestBody?: boolean;
  settingEncodeUrl?: boolean;
  settingRebuildPath?: boolean;
  settingFollowRedirects?: string;
  _type: string;
  environment?: Record<string, string>;
  environmentPropertyOrder?: { "&": string[] } | null;
  data?: Record<string, string>;
};
