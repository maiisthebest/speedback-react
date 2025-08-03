# 🌀 Speedback (Frontend)

Welcome to the frontend for Speedback!

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Vitest + React Testing Library

## ✨ Features

- **Responsive design**: Adapts to different screen sizes for a great experience on any device.
- **Screen reader accessible**: Built with accessibility in mind for users of screen readers 🙌

## 🚀 Getting Started

**1. Install the magic**

```bash
npm install
```

**2. Start the fun**

```bash
npm run dev
```

**3. Run the tests (because I care!)**

```bash
npm run test
```

## 🗂️ Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── PromptGenerator.tsx
│   │   ├── PromptGenerator.test.tsx
│   │   ├── PromptGenerator.css
│   │   ├── PromptSuggestions.tsx
│   │   ├── PromptSuggestions.test.tsx
│   │   ├── PromptSuggestions.css
│   │   ├── SpeedbackForm.tsx
│   │   ├── SpeedbackForm.test.tsx
│   │   ├── SpeedbackForm.css
│   │   ├── roundRobin.ts        # The Round Robin algorithm lives here!
│   │   └── roundRobin.test.ts
│   ├── test/
│   │   └── setup.ts
│   └── App.tsx
├── public/
├── package.json
└── README.md
```
