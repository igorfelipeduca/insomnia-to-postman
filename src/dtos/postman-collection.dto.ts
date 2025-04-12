import { z } from "zod";
import { PostmanCollection } from "../__types__/postman-collection";
import { PostmanItem } from "../__types__/postman-collection";

type PostmanItemSchemaType = z.ZodType<PostmanItem>;

const PostmanItemSchema: PostmanItemSchemaType = z.lazy(() =>
  z.object({
    name: z.string(),
    item: z.array(PostmanItemSchema).optional(),
    request: z.object({
      auth: z.object({
        type: z.string(),
        bearer: z.array(z.object({
          key: z.string(),
          value: z.string(),
          type: z.string()
        }))
      }).optional(),
      method: z.string(),
      header: z.array(z.object({
        key: z.string(),
        value: z.string(),
        type: z.string().optional()
      })),
      body: z.object({
        mode: z.string(),
        raw: z.string(),
        options: z.object({
          raw: z.object({
            language: z.string()
          })
        }).optional()
      }).optional(),
      url: z.object({
        raw: z.string(),
        host: z.array(z.string()),
        path: z.array(z.string()),
        query: z.array(z.object({
          key: z.string(),
          value: z.string(),
          disabled: z.boolean().optional()
        })).optional(),
        variable: z.array(z.object({
          key: z.string(),
          value: z.string()
        })).optional()
      })
    }).optional(),
    response: z.array(z.unknown())
  }));

const PostmanCollectionSchema = z.object({
  info: z.object({
    _postman_id: z.string().optional(),
    name: z.string(),
    schema: z.string(),
    _exporter_id: z.string().optional(),
    _collection_link: z.string().optional()
  }),
  item: z.array(PostmanItemSchema),
  auth: z.object({
    type: z.string(),
    bearer: z.array(z.object({
      key: z.string(),
      value: z.string(),
      type: z.string()
    }))
  }),
  event: z.array(z.object({
    listen: z.string(),
    script: z.object({
      type: z.string(),
      packages: z.record(z.unknown()),
      exec: z.array(z.string())
    })
  })),
  variable: z.array(z.object({
    key: z.string(),
    value: z.string()
  }))
});

export class PostmanCollectionDTO {
  parsedCollection: PostmanCollection;

  constructor(collection: PostmanCollection) {
    this.parsedCollection = PostmanCollectionSchema.parse(collection);
  }
}
