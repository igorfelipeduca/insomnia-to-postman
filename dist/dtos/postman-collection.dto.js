"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostmanCollectionDTO = void 0;
const zod_1 = require("zod");
const PostmanItemSchema = zod_1.z.lazy(() => zod_1.z.object({
    name: zod_1.z.string(),
    item: zod_1.z.array(PostmanItemSchema).optional(),
    request: zod_1.z.object({
        auth: zod_1.z.object({
            type: zod_1.z.string(),
            bearer: zod_1.z.array(zod_1.z.object({
                key: zod_1.z.string(),
                value: zod_1.z.string(),
                type: zod_1.z.string()
            }))
        }).optional(),
        method: zod_1.z.string(),
        header: zod_1.z.array(zod_1.z.object({
            key: zod_1.z.string(),
            value: zod_1.z.string(),
            type: zod_1.z.string().optional()
        })),
        body: zod_1.z.object({
            mode: zod_1.z.string(),
            raw: zod_1.z.string(),
            options: zod_1.z.object({
                raw: zod_1.z.object({
                    language: zod_1.z.string()
                })
            }).optional()
        }).optional(),
        url: zod_1.z.object({
            raw: zod_1.z.string(),
            host: zod_1.z.array(zod_1.z.string()),
            path: zod_1.z.array(zod_1.z.string()),
            query: zod_1.z.array(zod_1.z.object({
                key: zod_1.z.string(),
                value: zod_1.z.string(),
                disabled: zod_1.z.boolean().optional()
            })).optional(),
            variable: zod_1.z.array(zod_1.z.object({
                key: zod_1.z.string(),
                value: zod_1.z.string()
            })).optional()
        })
    }).optional(),
    response: zod_1.z.array(zod_1.z.unknown())
}));
const PostmanCollectionSchema = zod_1.z.object({
    info: zod_1.z.object({
        _postman_id: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        schema: zod_1.z.string(),
        _exporter_id: zod_1.z.string().optional(),
        _collection_link: zod_1.z.string().optional()
    }),
    item: zod_1.z.array(PostmanItemSchema),
    auth: zod_1.z.object({
        type: zod_1.z.string(),
        bearer: zod_1.z.array(zod_1.z.object({
            key: zod_1.z.string(),
            value: zod_1.z.string(),
            type: zod_1.z.string()
        }))
    }),
    event: zod_1.z.array(zod_1.z.object({
        listen: zod_1.z.string(),
        script: zod_1.z.object({
            type: zod_1.z.string(),
            packages: zod_1.z.record(zod_1.z.unknown()),
            exec: zod_1.z.array(zod_1.z.string())
        })
    })),
    variable: zod_1.z.array(zod_1.z.object({
        key: zod_1.z.string(),
        value: zod_1.z.string()
    }))
});
class PostmanCollectionDTO {
    constructor(collection) {
        this.parsedCollection = PostmanCollectionSchema.parse(collection);
    }
}
exports.PostmanCollectionDTO = PostmanCollectionDTO;
//# sourceMappingURL=postman-collection.dto.js.map