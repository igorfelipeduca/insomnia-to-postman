"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insomniaToPostman = void 0;
const postman_collection_dto_1 = require("../dtos/postman-collection.dto");
const insomniaToPostman = (insomniaCollection) => {
    const postmanCollection = new postman_collection_dto_1.PostmanCollectionDTO({
        info: {
            name: insomniaCollection.name,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        },
        item: insomniaCollection.collection.map((collection) => {
            return {
                name: collection.name,
                item: collection.children.map((item) => {
                    var _a, _b;
                    return ({
                        name: item.name,
                        request: {
                            method: item.method,
                            header: item.headers.map((header) => {
                                if (typeof header === "object" &&
                                    header !== null &&
                                    "name" in header &&
                                    "value" in header) {
                                    return {
                                        key: header.name,
                                        value: header.value,
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
                                    raw: (_b = (_a = item.body) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : "",
                                    options: {
                                        raw: {
                                            language: item.body.mimeType === "application/json"
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
                    });
                }),
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
exports.insomniaToPostman = insomniaToPostman;
//# sourceMappingURL=insomnia-to-postman.js.map