import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import PromptGenerator from "./PromptGenerator";

describe("PromptGenerator", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		user = userEvent.setup();
	});

	it("toggles prompt accordion on click", async () => {
		render(<PromptGenerator />);

		const summary = screen.getByRole("heading", {
			name: "💡 Need help preparing for the session?",
		});
		expect(summary).toBeInTheDocument();

		const content = screen.getByText(/giving feedback can be tricky/i);
		expect(content).not.toBeVisible();

		await user.click(summary);
		expect(content).toBeVisible();

		await user.click(summary);
		expect(content).not.toBeVisible();
	});

	it("shifts focus to Topic input (first focusable content) when accordion is clicked", async () => {
		render(<PromptGenerator />);

		expect(
			screen.getByText(/giving feedback can be tricky/i),
		).not.toBeVisible();
		expect(
			screen.getByRole("textbox", { name: "Topic" }),
		).not.toBeVisible();

		await user.click(
			screen.getByRole("heading", {
				name: "💡 Need help preparing for the session?",
			}),
		);

		expect(
			await screen.findByRole("textbox", { name: "Topic" }),
		).toHaveFocus();
		expect(
			await screen.findByText(/giving feedback can be tricky/i),
		).toBeVisible();
	});
});
