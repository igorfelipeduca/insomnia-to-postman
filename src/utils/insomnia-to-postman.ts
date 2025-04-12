import { InsomniaCollection } from "../__types__/insomnia-collection";
import { PostmanCollection } from "../__types__/postman-collection";
import { PostmanCollectionDTO } from "../dtos/postman-collection.dto";

export const insomniaToPostman = (
  insomniaCollection: InsomniaCollection
): PostmanCollectionDTO => {
  const postmanCollection = new PostmanCollectionDTO({
    info: {
      name: insomniaCollection.name,
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: insomniaCollection.collection.map((collection) => {
      return {
        name: collection.name,
        item: collection.children.map((item) => ({
          name: item.name,
          request: {
            method: item.method,
            header: item.headers.map((header) => {
              if (
                typeof header === "object" &&
                header !== null &&
                "name" in header &&
                "value" in header
              ) {
                return {
                  key: (header as { name: string; value: string }).name,
                  value: (header as { name: string; value: string }).value,
                };
              }
              if (typeof header === "string") {
                const [key, value] = header.split(": ");
                return { key, value };
              }
              return { key: "", value: "" };
            }),
            body: item.body
              ? {
                  mode: "raw",
                  raw: item.body?.text ?? "",
                  options: {
                    raw: {
                      language:
                        item.body.mimeType === "application/json"
                          ? "json"
                          : "text",
                    },
                  },
                }
              : undefined,
            url: {
              raw: item.url,
              host: [item.url],
              path: [],
            },
          },
          response: [],
        })),
        response: [],
      };
    }),
    auth: {
      type: "bearer",
      bearer: [
        {
          key: "token",
          value: "{{token}}",
          type: "string",
        },
      ],
    },
    event: [],
    variable: [],
  });

  return postmanCollection;
};
