# 🌀 Speedback

Welcome to the Speedback project - your new favorite tool for organising speed-dating style feedback sessions 🚀

This is a monorepo containing the frontend and backend. Speedback is my favourite way to get / give feedback with my team and I use it very often. However, I always had to keep track of the feedback rounds using a spreadsheet. That's clunky and full of errors. So I created this project 🎊

With this app, you can:

- Add and remove participants on the fly
- Instantly generate rounds so everyone gets a turn with everyone else
- Clearly see who "sits out" each round
- View all rounds in a super clear, organised way

## ✨ Features

- Add participants with their names (nicknames, emojis, whatever you like!)
- Remove participants with a single click (no hard feelings!)
- See a live list of everyone in the session
- Generate and view all rounds, so nobody misses out
- **Powered by the Round Robin algorithm** – everyone meets everyone, and if there's an odd number, you'll know who gets to chill each round ("Mai sits out")
- Clean, minimal, and responsive UI that looks great on any device (lol more like I'm not good with design haha)
- Battle-tested with Vitest and React Testing Library (using test-driven development!)

## 🌀 How Does It Work? (The Magic of Round Robin)

I use the classic **Round Robin algorithm** to make sure every participant gets paired with every other participant, with no repeats and no one left out. If there's an odd number of people, someone gets a break each round.

- Each round, you'll see who's meeting whom.
- Got an odd number of folks? Someone gets to "sit out" and recharge (e.g., "Mai sits out").
- By the end, everyone will have met everyone else. No one left behind!

Want to see how it works? Check out [`frontend/src/components/roundRobin.ts`](frontend/src/components/roundRobin.ts) for the implementation.

## 🚦 Project Status

✅ **Core features are ready to roll!**

You can add/remove people, generate rounds, and see who's taking a break. Want to add more magic? PRs are welcome!

_This project was made for fun! I'm not an expert in design, so the styling might not be the fanciest, BUT it works_ 😝

## Workspaces

This project is divided into two workspaces:

- [`frontend/`](./frontend): A React application built with Vite and TypeScript.
- [`backend/`](./backend): A Node.js application.

## Getting Started

To get started with this project, clone the repository and install the dependencies in the root directory:

```bash
git clone https://github.com/your-username/speedback-react.git
cd speedback-react
npm install
```

Then, you can run the frontend and backend applications from their respective workspaces. See the `README.md` in each workspace for more detailed instructions.

## 🗂️ Project Structure

```
.
├── backend/
│   └── README.md
├── frontend/
│   ├── src/
│   └── README.md
├── package.json
└── README.md
```

## 🤝 Contributing

This project is open to ideas, improvements, and fun! Found a bug? Got a feature in mind? Got a better design?Open an issue or send a pull request. I welcome them all ❤️
