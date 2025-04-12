import * as yaml from "js-yaml";
import { InsomniaCollection } from "../__types__/insomnia-collection";

export const parseInsomniaCollection = (collection: string) => {
  const collectionJSON = yaml.load(collection) as InsomniaCollection;

  return collectionJSON;
};
