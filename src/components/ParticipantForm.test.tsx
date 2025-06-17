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

	it("adds a participant when the form is submitted", async () => {
		render(<ParticipantForm />);

		await user.type(screen.getByRole("textbox"), "John Smith");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByRole("listitem")).toHaveTextContent("John Smith");
	});

	it("does not add a participant if the name is empty", async () => {
		render(<ParticipantForm />);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
		expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
	});
});
