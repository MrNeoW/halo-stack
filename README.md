# Halo Stack

A TypeScript Node.js backend application.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server with hot-reload:
```bash
npm run dev
```

## Building

To build the project:
```bash
npm run build
```

## Production

To start the production server:
```bash
npm start
```

## Testing

To run tests:
```bash
npm test
```

## Project Structure

```
halo-stack/
├── src/            # Source files
│   └── index.ts    # Main application file
├── dist/           # Compiled output (generated)
├── package.json    # Project configuration
└── tsconfig.json   # TypeScript configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=8000
```

## License

MIT 