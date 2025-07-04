# 🎉 Speedback Round Generator

Welcome to the **Speedback Round Generator** – your new favorite tool for organising speed feedback sessions 🚀

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

Want to see how it works? Check out [`src/components/roundRobin.ts`](src/components/roundRobin.ts) for the implementation.

## 🚦 Project Status

✅ **Core features are ready to roll!**

You can add/remove people, generate rounds, and see who's taking a break. Want to add more magic? PRs are welcome!

_This project was made for fun! I'm not an expert in design, so the styling might not be the fanciest, BUT it works_ 😝

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Vitest + React Testing Library

## 🚀 Getting Started

1. **Clone this repo**

```bash
git clone [repo-url]
cd speedback-react
```

2. **Install the magic**

```bash
npm install
```

3. **Start the fun**

```bash
npm run dev
```

4. **Run the tests (because I care!)**

```bash
npm run test:watch
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── SpeedbackForm.tsx
│   ├── SpeedbackForm.test.tsx
│   ├── SpeedbackForm.css
│   ├── roundRobin.ts        # The Round Robin algorithm lives here!
│   └── roundRobin.test.ts
├── test/
│   └── setup.ts
└── App.tsx
```

## 🔄 How Rounds Work

- Each round, you'll see who's meeting whom.
- Got an odd number of folks? Someone gets to "sit out" and recharge (e.g., "Mai sits out").
- By the end, everyone will have met everyone else. No one left behind!

## 🤝 Contributing

This project is open to ideas, improvements, and fun! Found a bug? Got a feature in mind? Open an issue or send a pull request. Let's make speedback even speedier, together!

## 📄 License

MIT – use it, remix it, share it, enjoy it!
