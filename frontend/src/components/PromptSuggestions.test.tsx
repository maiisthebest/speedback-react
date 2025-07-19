import { render, screen, waitFor } from "@testing-library/react";
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
				/Just type in a topic like communication or problem solving, and our AI will generate some prompt questions to help you get started./i,
			),
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Topic" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Generate" }),
		).toBeInTheDocument();
	});

	it("generates prompts for a Topic when Generate button is clicked", async () => {
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
		await user.click(screen.getByRole("button", { name: "Generate" }));

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

	it("displays error message when topic is empty", async () => {
		render(<PromptSuggestions />);

		await user.click(screen.getByRole("button", { name: "Generate" }));

		expect(screen.getByText("Topic cannot be empty")).toBeInTheDocument();
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("clears the error message when the user starts typing", async () => {
		render(<PromptSuggestions />);

		await user.click(screen.getByRole("button", { name: "Generate" }));

		expect(screen.getByText("Topic cannot be empty")).toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			"new topic",
		);

		expect(
			screen.queryByText("Topic cannot be empty"),
		).not.toBeInTheDocument();
	});

	it("handles fetch errors gracefully", async () => {
		const errorMessage = "Network error";
		fetchSpy.mockRejectedValueOnce(new Error(errorMessage));

		render(<PromptSuggestions />);

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			"problem solving",
		);
		await user.click(screen.getByRole("button", { name: "Generate" }));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			`${mockBaseUrl}/api/feedback-prompts`,
			expect.objectContaining({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ topic: "problem solving" }),
			}),
		);

		expect(
			await screen.findByText(
				/An error occurred while generating prompts. Please try again./i,
			),
		).toBeInTheDocument();
	});

	it("handles non-ok fetch response gracefully", async () => {
		fetchSpy.mockResolvedValueOnce({
			ok: false,
			statusText: "Internal Server Error",
		} as Response);

		render(<PromptSuggestions />);

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			"problem solving",
		);
		await user.click(screen.getByRole("button", { name: "Generate" }));

		expect(
			await screen.findByText(
				"An error occurred while generating prompts. Please try again.",
			),
		).toBeInTheDocument();
	});

	it("logs the specific error message from the backend to the console", async () => {
		const backendErrorMessage = "Specific backend error.";
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		fetchSpy.mockResolvedValueOnce({
			ok: false,
			status: 400,
			json: async () => ({ error: backendErrorMessage }),
		} as Response);

		render(<PromptSuggestions />);

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			"a valid topic",
		);
		await user.click(screen.getByRole("button", { name: "Generate" }));

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"Error generating prompts:",
				expect.objectContaining({ message: backendErrorMessage }),
			);
		});

		expect(
			screen.getByText(
				"An error occurred while generating prompts. Please try again.",
			),
		).toBeInTheDocument();

		consoleErrorSpy.mockRestore();
	});
});
