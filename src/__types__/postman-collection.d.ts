export type PostmanCollection = {
  info: {
    _postman_id?: string;
    name: string;
    schema: string;
    _exporter_id?: string;
    _collection_link?: string;
  };
  item: PostmanItem[];
  auth: {
    type: string;
    bearer: {
      key: string;
      value: string;
      type: string;
    }[];
  };
  event: {
    listen: string;
    script: {
      type: string;
      packages: Record<string, unknown>;
      exec: string[];
    };
  }[];
  variable: {
    key: string;
    value: string;
  }[];
};

export type PostmanItem = {
  name: string;
  item?: PostmanItem[];
  request?: {
    auth?: {
      type: string;
      bearer: {
        key: string;
        value: string;
        type: string;
      }[];
    };
    method: string;
    header: {
      key: string;
      value: string;
      type?: string;
    }[];
    body?: {
      mode: string;
      raw: string;
      options?: {
        raw: {
          language: string;
        };
      };
    };
    url: {
      raw: string;
      host: string[];
      path: string[];
      query?: {
        key: string;
        value: string;
        disabled?: boolean;
      }[];
      variable?: {
        key: string;
        value: string;
      }[];
    };
  };
  response: unknown[];
};
