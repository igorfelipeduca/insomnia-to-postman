import { InsomniaCollection } from "../__types__/insomnia-collection";
import { PostmanCollection } from "../__types__/postman-collection";
import { PostmanCollectionDTO } from "../dtos/postman-collection.dto";

export const insomniaToPostman = (
  insomniaCollection: InsomniaCollection
): PostmanCollectionDTO => {
  // Handle old Insomnia collection format
  if (insomniaCollection._type === "export" && insomniaCollection.resources) {
    // Extract environment variables from Insomnia resources
    const envResources = insomniaCollection.resources.filter(
      (r) => r._type === "environment" && r.data
    );

    const variables = envResources.reduce((acc, env) => {
      const envVars = Object.entries(env.data || {}).map(([key, value]) => ({
        key,
        value: value as string,
        type: "string"
      }));
      return [...acc, ...envVars];
    }, [] as Array<{key: string, value: string, type: string}>);

    const folderResources = insomniaCollection.resources.filter(
      (r) => r._type === "request_group"
    );
    const requestResources = insomniaCollection.resources.filter(
      (r) => r._type === "request"
    );

    const postmanCollection = new PostmanCollectionDTO({
      info: {
        name: "Converted Collection",
        schema:
          "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },
      item: folderResources.map((folder) => {
        const folderRequests = requestResources.filter(
          (r) => r.parentId === folder._id
        );
        return {
          name: folder.name,
          item: folderRequests.map((req) => ({
            name: req.name,
            request: {
              method: req.method || "GET",
              header: (req.headers || []).map((header) => ({
                key: header.name,
                value: header.value,
              })),
              body: req.body
                ? {
                    mode: "raw",
                    raw: req.body.text || "",
                    options: {
                      raw: {
                        language: req.headers?.some(
                          h => h.name.toLowerCase() === "content-type" && 
                              h.value.toLowerCase().includes("application/json")
                        ) || req.body.mimeType === "application/json"
                          ? "json"
                          : "text"
                      }
                    }
                  }
                : undefined,
              url: {
                raw: req.url,
                host: [req.url],
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
      variable: variables,
    });

    return postmanCollection;
  }

  // Handle new Insomnia collection format
  const postmanCollection = new PostmanCollectionDTO({
    info: {
      name: insomniaCollection.name || "Converted Collection",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: (insomniaCollection.collection || []).map((collection) => {
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
                      language: (item.headers || []).some(
                        header => typeof header === "string" && 
                                header.toLowerCase().includes("content-type: application/json")
                      ) || item.body.mimeType === "application/json"
                        ? "json"
                        : "text"
                    }
                  }
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
    variable: insomniaCollection.environments?.[0]?.data 
      ? Object.entries(insomniaCollection.environments[0].data).map(([key, value]) => ({
          key,
          value: value as string,
          type: "string"
        }))
      : [],
  });

  return postmanCollection;
};
