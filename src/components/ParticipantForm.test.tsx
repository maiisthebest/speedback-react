import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParticipantForm from "./ParticipantForm";

describe("ParticipantForm", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		user = userEvent.setup();
	});

	it("renders the form with input and add button", () => {
		render(<ParticipantForm />);

		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
	});

	it("adds a participant when Add button is clicked", async () => {
		render(<ParticipantForm />);

		await user.type(screen.getByRole("textbox"), "John Smith");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
			"John Smith"
		);
	});

	it("adds a participant when the form is submitted", async () => {
		render(<ParticipantForm />);

		await user.type(screen.getByRole("textbox"), "John Smith");
		await user.keyboard("{Enter}");

		expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
			"John Smith"
		);
	});

	it("does not add a participant if the name is empty", async () => {
		render(<ParticipantForm />);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
		expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
	});

	it("generates rounds when participants are added", async () => {
		render(<ParticipantForm />);

		await user.type(screen.getByRole("textbox"), "Alice");
		await user.keyboard("{Enter}");

		await user.type(screen.getByRole("textbox"), "Bob");
		await user.keyboard("{Enter}");

		expect(screen.getByText("Rounds")).toBeInTheDocument();
		expect(screen.getByText("Round 1")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Bob")).toBeInTheDocument();

		await user.type(screen.getByRole("textbox"), "Charlie");
		await user.keyboard("{Enter}");

		expect(screen.getByText("Round 1")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Charlie")).toBeInTheDocument();

		expect(screen.getByText("Round 2")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ BYE")).toBeInTheDocument();
		expect(screen.getByText("Bob ↔ Charlie")).toBeInTheDocument();

		expect(screen.getByText("Round 3")).toBeInTheDocument();
		expect(screen.getByText("Alice ↔ Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie ↔ BYE")).toBeInTheDocument();
	});
});
