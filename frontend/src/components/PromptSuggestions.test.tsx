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
			screen.getByText(/Giving feedback can be tricky./i),
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

	it("shows and hides loading spinner during fetch", async () => {
		let resolveFetch: (
			value: Response | PromiseLike<Response>,
		) => void = () => {};
		fetchSpy.mockImplementationOnce(
			() =>
				new Promise((resolve) => {
					resolveFetch = resolve;
				}),
		);

		render(<PromptSuggestions />);

		await user.type(
			screen.getByRole("textbox", { name: "Topic" }),
			"test topic",
		);
		await user.click(screen.getByRole("button", { name: "Generate" }));

		expect(screen.getByLabelText("Loading...")).toBeInTheDocument();

		resolveFetch({
			ok: true,
			json: async () => ({ prompts: ["Prompt1"] }),
		} as Response);

		expect(await screen.findByText("Prompt1")).toBeInTheDocument();
		expect(screen.queryByLabelText("Loading...")).not.toBeInTheDocument();
	});
});
