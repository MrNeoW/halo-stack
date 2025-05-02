# Halo Stack

A TypeScript Node.js backend application.

## Installation

1. Clone the repository : https://github.com/MrNeoW/halo-stack.git
 - Make sure you are in the master branch
 - Have Node 18 and up
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server with hot-reload:
```bash
npm run dev
```

## Project Structure

```
halo-stack/
├── src/            # Source files
│   └── config      # AWS DynamoClient.ts - this is the setup to use the AWS DynamoDB
│   └── controllers # DynamoDBController.ts - in here is our create, update, put and get calls to the AWS DynamoDB
│   └── models      # Was our table structure for the sqlite db
│   └── index.ts    # Main application file
├── dist/           # Compiled output (generated)
├── package.json    # Project configuration
└── tsconfig.json   # TypeScript configuration
└── database.sqlite # Local sqlite db used for the testing of application
```

```
PORT=8000
```

## License

MIT 