import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoundGenerator from "./RoundGenerator";

describe("RoundGenerator", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		user = userEvent.setup();
	});

	it("renders correctly with default state", () => {
		render(<RoundGenerator />);

		expect(
			screen.getByRole("textbox", { name: "Participant Name" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
	});

	it("adds a participant when Add button is clicked", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"John Smith",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
			"John Smith",
		);
	});

	it("adds a participant when the form is submitted", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"John Smith",
		);
		await user.keyboard("{Enter}");

		expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
			"John Smith",
		);
	});

	it("shows the correct number of participants count in the heading", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.keyboard("{Enter}");

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Bob",
		);
		await user.keyboard("{Enter}");

		expect(screen.getByText("Participants (2)")).toBeInTheDocument();
	});

	it("does not add a participant if the name is empty", async () => {
		render(<RoundGenerator />);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
		expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
	});

	it("does not add a duplicate participant", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.keyboard("{Enter}");

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.keyboard("{Enter}");

		expect(screen.getAllByText("Alice")).toHaveLength(1);
		expect(screen.getByText("Name already exists")).toBeInTheDocument();
	});

	it("generates rounds when participants are added", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.keyboard("{Enter}");

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Bob",
		);
		await user.keyboard("{Enter}");

		expect(screen.getByText("Rounds (1)")).toBeInTheDocument();
		expect(screen.getByText("Round 1")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Bob")).toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Charlie",
		);
		await user.keyboard("{Enter}");

		expect(screen.getByText("Rounds (3)")).toBeInTheDocument();
		expect(screen.getByText("Round 1")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Charlie")).toBeInTheDocument();

		expect(screen.getByText("Round 2")).toBeInTheDocument();
		expect(screen.getByText("Alice sits out")).toBeInTheDocument();
		expect(screen.getByText("Bob ↔ Charlie")).toBeInTheDocument();

		expect(screen.getByText("Round 3")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie sits out")).toBeInTheDocument();
	});

	it("shows the correct number of rounds count in the heading", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.keyboard("{Enter}");

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Bob",
		);
		await user.keyboard("{Enter}");

		expect(
			screen.getByRole("heading", { name: "Rounds (1)" }),
		).toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Charlie",
		);
		await user.keyboard("{Enter}");

		expect(screen.getByText("Rounds (3)")).toBeInTheDocument();
	});

	it("does not show rounds if there is 1 participant or less", async () => {
		render(<RoundGenerator />);

		expect(
			screen.queryByRole("heading", { name: "Rounds (0)" }),
		).not.toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(
			screen.queryByRole("heading", { name: "Rounds (1)" }),
		).not.toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Bob",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(
			screen.getByRole("heading", { name: "Rounds (1)" }),
		).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Remove Alice" }));

		expect(
			screen.queryByRole("heading", { name: "Rounds (1)" }),
		).not.toBeInTheDocument();
	});

	it("removes a participant and recalculates rounds when participants are removed", async () => {
		render(<RoundGenerator />);

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Alice",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Bob",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.type(
			screen.getByRole("textbox", { name: "Participant Name" }),
			"Charlie",
		);
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Participants (3)")).toBeInTheDocument();
		expect(screen.getByText("Rounds (3)")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Remove Alice" }));

		expect(screen.queryByText("Alice")).not.toBeInTheDocument();
		expect(screen.getByText("Participants (2)")).toBeInTheDocument();
		expect(screen.getByText("Rounds (1)")).toBeInTheDocument();
		expect(screen.getByText("Bob ↔ Charlie")).toBeInTheDocument();
	});
});
