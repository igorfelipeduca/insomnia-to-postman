#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { Command } from "commander";
import { parseInsomniaCollection } from "./utils/parse-insomnia-collection";
import { insomniaToPostman } from "./utils/insomnia-to-postman";

const program = new Command();

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
      const inputPath = path.resolve(input);

      // Ensure input file exists
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file ${input} does not exist`);
        process.exit(1);
      }

      // Extract file extension for format detection
      const fileExtension = path.extname(inputPath).toLowerCase();

      // Use positional output argument if provided, then option, then default
      const outputFile =
        output ||
        options.output ||
        inputPath.replace(/\.(ya?ml|json)$/i, ".postman_collection.json");
      const outputPath = path.resolve(outputFile);

      // Create output directory if it doesn't exist
      const outputDir = path.dirname(outputPath);
      await fs.ensureDir(outputDir);

      // Read and convert
      const collectionFileContent = await fs.readFile(inputPath, "utf8");
      const insomniaCollection = parseInsomniaCollection(
        collectionFileContent,
        fileExtension
      );

      const postmanCollection = insomniaToPostman(insomniaCollection);

      // Write output
      await fs.writeFile(
        outputPath,
        JSON.stringify(postmanCollection.parsedCollection, null, 2)
      );

      console.log(`Successfully converted ${input} to ${outputPath}`);
    } catch (error: any) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse();
