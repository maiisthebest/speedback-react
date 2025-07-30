# 🌀 Speedback

Welcome to the Speedback project - your new favorite tool for organising speed-dating style feedback sessions 🚀

This is a monorepo containing the frontend and backend. Speedback is my favourite way to get / give feedback with my team. I use it very often, and had to keep track of the feedback rounds using a spreadsheet. That's clunky and full of errors. So I created this project 🎊

## ✨ Features

- Add participants by name — nicknames, emojis, whatever works!
- Remove participants with a single click.
- Generate rounds instantly using the **Round Robin algorithm** — everyone meets everyone, no repeats.
- View rounds in a clear, organised layout.
- See at a glance who “sits out” each round.
- Get feedback prompts powered by **generative AI** to help prepare for speedback rounds.
- Clean, minimal, and responsive UI (okay fine, I'm not that good in design 😅).
- Built with accessibility in mind — screen reader friendly!
- Tested with Vitest + React Testing Library (yep, TDD for the win!).

## 🌀 How Does It Work?

### The Magic of Round Robin

I use the classic **Round Robin algorithm** to make sure every participant gets paired with every other participant, with no repeats and no one left out. If there's an odd number of people, someone gets a break each round.

- Each round, you'll see who's meeting whom.
- Got an odd number of folks? Someone gets to "sit out" and recharge (e.g., "Mai sits out").
- By the end, everyone will have met everyone else. No one left behind!

Want to see how it works? Check out [`frontend/src/components/roundRobin.ts`](frontend/src/components/roundRobin.ts) for the implementation.

### A Little AI Magic ✨

Giving feedback can be tricky. Sometimes you’re just not sure what to say. That’s why the app also includes AI-generated prompts to help participants prepare for their feedback rounds. Just enter the session topic or topics, and the app suggests friendly, open-ended prompts to get the conversation flowing.

Check out [`backend/src/generateFeedbackPrompts.js`](backend/src/generateFeedbackPrompts.js) for the implementation.

## 🚦 Project Status

✅ **Core features are ready to roll!**

You can add/remove people, generate rounds, see who's taking a break, and get some help with AI-generated feedback prompts. Want to add more magic? PRs are welcome!

_This project was made for fun! I'm not an expert in design, so the styling might not be the fanciest, BUT it works_ 😝

## 🚀 Future Enhancements

The plan is to make Speedback smarter and more context‑aware (AI context engineering ✨). Upcoming ideas include:

- **Dynamic timing suggestions** – recommend how long each round should last based on participant number and topics.
- **Topic recommendations** – surface feedback themes or areas to explore based on past sessions.

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
