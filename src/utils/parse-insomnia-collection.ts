import * as yaml from "js-yaml";
import { InsomniaCollection } from "../__types__/insomnia-collection";

export const parseInsomniaCollection = (collection: string, fileExtension = ''): InsomniaCollection => {
  try {
    // Try parsing as JSON first if extension is .json
    if (fileExtension.toLowerCase() === '.json') {
      return JSON.parse(collection);
    }
    
    // Try parsing as YAML (default)
    return yaml.load(collection) as InsomniaCollection;
  } catch (error: any) {
    // If parsing fails with the detected format, try the alternative format
    try {
      if (fileExtension.toLowerCase() === '.json') {
        // If JSON parsing failed, try YAML
        return yaml.load(collection) as InsomniaCollection;
      } else {
        // If YAML parsing failed, try JSON
        return JSON.parse(collection);
      }
    } catch (secondError) {
      // If both parsing methods fail, throw the original error
      throw new Error(`Failed to parse Insomnia collection: ${error.message}`);
    }
  }
};
