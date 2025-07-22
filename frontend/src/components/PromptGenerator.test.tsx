import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PromptGenerator from "./PromptGenerator";

describe("PromptGenerator", () => {
	it("renders correctly and toggles prompt accordion visibility on click", async () => {
		const user = userEvent.setup();
		render(<PromptGenerator />);

		const heading = screen.getByRole("heading", {
			name: "💡 Need help preparing for the session?",
		});
		expect(heading).toBeInTheDocument();

		const content = screen.getByText(/giving feedback can be tricky/i);
		expect(content).not.toBeVisible();

		await user.click(heading);
		expect(content).toBeVisible();

		await user.click(heading);
		expect(content).not.toBeVisible();
	});
});
