import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpeedbackForm from "./SpeedbackForm";

describe("SpeedbackForm", () => {
	it("renders correctly with default state", () => {
		render(<SpeedbackForm />);

		expect(
			screen.getByRole("heading", { name: "Speedback" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Quickly pair up your team/i),
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Topic" }),
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Participant Name" }),
		).toBeInTheDocument();
	});
});
