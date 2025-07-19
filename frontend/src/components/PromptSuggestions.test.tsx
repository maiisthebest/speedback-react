import { render, screen } from "@testing-library/react";
import PromptSuggestions from "./PromptSuggestions";
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type MockInstance,
} from "vitest";
import userEvent from "@testing-library/user-event";

describe("PromptSuggestions", () => {
	const mockBaseUrl = "http://localhost:3000";

	let user: ReturnType<typeof userEvent.setup>;
	let fetchSpy: MockInstance<typeof fetch>;

	beforeEach(() => {
		user = userEvent.setup();
		fetchSpy = vi.spyOn(globalThis, "fetch");
		vi.stubEnv("VITE_BACKEND_URL", mockBaseUrl);
	});

	afterEach(() => {
		fetchSpy.mockRestore();
	});

	it("renders correctly", () => {
		render(<PromptSuggestions />);

		expect(
			screen.getByText(
				/Just type in a topic like communication or problem solving, and our AI will suggest some prompt questions to help you get started./i,
			),
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Topic" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Suggest" }),
		).toBeInTheDocument();
	});

	it("suggests prompts on form submission", async () => {
		const mockPrompts = { prompts: ["Prompt1", "Prompt2"] };
		const testTopic = "communication";

		fetchSpy.mockResolvedValueOnce({
			ok: true,
			json: async () => mockPrompts,
		} as Response);

		render(<PromptSuggestions />);

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			testTopic,
		);
		await user.click(screen.getByRole("button", { name: "Suggest" }));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			`${mockBaseUrl}/api/feedback-prompts`,
			expect.objectContaining({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ topic: testTopic }),
			}),
		);
		expect(await screen.findByText("Prompt1")).toBeInTheDocument();
		expect(await screen.findByText("Prompt2")).toBeInTheDocument();
	});
});
