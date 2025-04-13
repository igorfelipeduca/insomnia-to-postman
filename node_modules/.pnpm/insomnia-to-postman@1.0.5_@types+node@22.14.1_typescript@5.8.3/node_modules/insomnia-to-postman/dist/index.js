#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const parse_insomnia_collection_1 = require("./utils/parse-insomnia-collection");
const insomnia_to_postman_1 = require("./utils/insomnia-to-postman");
const program = new commander_1.Command();
program
    .name("insomnia-to-postman")
    .description("Convert Insomnia collection to Postman format")
    .version("1.0.5")
    .argument("<input>", "Input Insomnia collection file (YAML or JSON)")
    .argument("[output]", "Output Postman collection file (JSON)")
    .option("-o, --output <file>", "Output Postman collection file (JSON)")
    .action(async (input, output, options) => {
    try {
        // Resolve absolute paths
        const inputPath = path_1.default.resolve(input);
        // Ensure input file exists
        if (!fs_extra_1.default.existsSync(inputPath)) {
            console.error(`Error: Input file ${input} does not exist`);
            process.exit(1);
        }
        // Extract file extension for format detection
        const fileExtension = path_1.default.extname(inputPath).toLowerCase();
        // Use positional output argument if provided, then option, then default
        const outputFile = output ||
            options.output ||
            inputPath.replace(/\.(ya?ml|json)$/i, ".postman_collection.json");
        const outputPath = path_1.default.resolve(outputFile);
        // Create output directory if it doesn't exist
        const outputDir = path_1.default.dirname(outputPath);
        await fs_extra_1.default.ensureDir(outputDir);
        // Read and convert
        const collectionFileContent = await fs_extra_1.default.readFile(inputPath, "utf8");
        const insomniaCollection = (0, parse_insomnia_collection_1.parseInsomniaCollection)(collectionFileContent, fileExtension);
        const postmanCollection = (0, insomnia_to_postman_1.insomniaToPostman)(insomniaCollection);
        // Write output
        await fs_extra_1.default.writeFile(outputPath, JSON.stringify(postmanCollection.parsedCollection, null, 2));
        console.log(`Successfully converted ${input} to ${outputPath}`);
    }
    catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=index.js.map