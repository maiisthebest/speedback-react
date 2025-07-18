import { render, screen } from "@testing-library/react";
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type MockInstance,
} from "vitest";
import PromptGenerator from "./PromptGenerator";
import userEvent from "@testing-library/user-event";

describe("PromptGenerator", () => {
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

	it("renders correctly with default state", () => {
		render(<PromptGenerator />);

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

		render(<PromptGenerator />);

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
