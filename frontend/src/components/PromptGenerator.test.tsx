import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PromptGenerator from "./PromptGenerator";

describe("PromptGenerator", () => {
	it("renders correctly", () => {
		render(<PromptGenerator />);

		expect(
			screen.getByRole("button", {
				name: "💡 Need help with giving feedback?",
			}),
		).toBeInTheDocument();
	});
});
