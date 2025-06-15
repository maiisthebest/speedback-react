# Speedback Round Generator

A React application that helps generate rounds for speedback (speed feedback) sessions. This tool allows you to:
- Add participants
- Generate rounds ensuring everyone meets with everyone else
- View the rounds in a clear, organised format

## Current Features
- Add participants with their names
- View list of added participants
- Basic UI for participant management

## Development Status
🚧 Under Development

Currently implementing core functionality using Test-Driven Development (TDD).

## Tech Stack
- React
- TypeScript
- Vite
- Vitest for testing
- React Testing Library

## Getting Started

1. Clone the repository
```bash
git clone [repo-url]
cd speedback-react
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Run tests
```bash
npm run test:watch
```

## Project Structure
```
src/
├── components/
│   ├── ParticipantForm.tsx
│   └── ParticipantForm.test.tsx
├── test/
│   └── setup.ts
└── App.tsx
```

## Contributing
This project is currently in active development. Feel free to submit issues and pull requests.

## License
MIT
