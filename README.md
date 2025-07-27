# 🌀 Speedback

Welcome to the Speedback project - your new favorite tool for organising speed-dating style feedback sessions 🚀

This is a monorepo containing the frontend and backend. Speedback is my favourite way to get / give feedback with my team. I use it very often, and had to keep track of the feedback rounds using a spreadsheet. That's clunky and full of errors. So I created this project 🎊

## ✨ Features

With this app, you can:

- Add participants with their names (nicknames, emojis, whatever you like!)
- Remove participants with a single click
- Instantly generate rounds so everyone gets a turn with everyone else
- View all rounds in a super clear, organised way
- Clearly see who "sits out" each round
- Generate feedback prompts using **generative AI** to help prepare for the speedback rounds
- **Powered by the Round Robin algorithm** – everyone meets everyone, and if there's an odd number, you'll know who gets to chill each round ("Mai sits out")
- Clean, minimal, and responsive UI that looks great on any device (lol more like I'm not good with design haha)
- Battle-tested with Vitest and React Testing Library (using test-driven development!)

## 🌀 How Does It Work?

### The Magic of Round Robin

I use the classic **Round Robin algorithm** to make sure every participant gets paired with every other participant, with no repeats and no one left out. If there's an odd number of people, someone gets a break each round.

- Each round, you'll see who's meeting whom.
- Got an odd number of folks? Someone gets to "sit out" and recharge (e.g., "Mai sits out").
- By the end, everyone will have met everyone else. No one left behind!

Want to see how it works? Check out [`frontend/src/components/roundRobin.ts`](frontend/src/components/roundRobin.ts) for the implementation.

### A Little AI Magic ✨

Giving feedback can be tricky. Sometimes you’re just not sure what to say. That’s why the app also includes AI-generated prompts to help participants prepare for their feedback rounds. Just enter the session topic, and the app suggests friendly, open-ended prompts to get the conversation flowing.

Check out [`backend/src/generateFeedbackPrompts.js`](backend/src/generateFeedbackPrompts.js) for the implementation.

## 🚦 Project Status

✅ **Core features are ready to roll!**

You can add/remove people, generate rounds, see who's taking a break, and get some help with AI-generated feedback prompts. Want to add more magic? PRs are welcome!

_This project was made for fun! I'm not an expert in design, so the styling might not be the fanciest, BUT it works_ 😝

## Workspaces

This project is divided into two workspaces:

- [`frontend/`](./frontend): A React application built with Vite and TypeScript.
- [`backend/`](./backend): A Node.js application.

## Getting Started

To get started with this project, clone the repository and install the dependencies in the root directory:

```bash
git clone https://github.com/maiisthebest/speedback-react.git
cd speedback-react
npm install
```

Then, you can run the frontend and backend applications from their respective workspaces. See the `README.md` in each workspace for more detailed instructions.

## 🗂️ Project Structure

```
.
├── backend/
│   ├── src/
│   └── README.md
├── frontend/
│   ├── src/
│   └── README.md
├── package.json
└── README.md
```

## 🤝 Contributing

This project is open to ideas, improvements, and fun! Found a bug? Got a feature in mind? Got a better design?Open an issue or send a pull request. I welcome them all ❤️
