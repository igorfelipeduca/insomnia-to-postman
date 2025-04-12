# Insomnia to Postman Converter

This project provides a simple way to convert Insomnia Collection YAML files into Postman v2.1.0 Collection JSON format. It maintains all request details including headers, body, authentication and other settings.

## Features

- Converts Insomnia YAML to Postman JSON format
- Preserves request metadata, headers and body
- Maintains folder structure and request organization
- Supports authentication settings
- Command-line interface (CLI) for easy usage

## Installation

You can install the CLI globally using npm:

```bash
npm install -g insomnia-to-postman
```

Or using pnpm:

```bash
pnpm add -g insomnia-to-postman
```

## Usage

After installation, you can use the CLI in two ways:

1. Using the global command:
```bash
insomnia-to-postman <input-file.yaml> <output-file.json>
```

2. Using npx:
```bash
npx insomnia-to-postman <input-file.yaml> <output-file.json>
```

Example:
```bash
insomnia-to-postman ./my-collection.yaml ./my-collection.postman_collection.json
```

## Development

If you want to contribute or run the project locally:

1. Clone this repository:
```bash
git clone https://github.com/igorfelipeduca/insomnia-to-postman.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm build
```

4. For development with auto-reload:
```bash
pnpm dev
```

## Importing the Postman Collection

Once the conversion is complete, you can import the generated Postman collection:

1. Open Postman
2. Click on **Import** in the top-left corner
3. Select **Upload Files** and choose your converted JSON file
4. Click **Import** to add the collection to your workspace

## Troubleshooting

If you encounter any issues:

- Make sure your Insomnia collection file is valid YAML and has a `.yaml` extension
- Check that the input file path is correct
- Ensure you have write permissions in the output directory
- For global command issues, try reinstalling the package:
  ```bash
  npm uninstall -g insomnia-to-postman
  npm install -g insomnia-to-postman
  ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

---

Let me know if you'd like further adjustments or additional sections!

---
Answer from Perplexity: pplx.ai/share


