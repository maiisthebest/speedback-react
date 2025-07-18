import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpeedbackForm from "./SpeedbackForm";

describe("SpeedbackForm", () => {
	it("renders correctly with default state", () => {
		render(<SpeedbackForm />);

		expect(screen.getByText("Speedback")).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Topic" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Suggest" }),
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", { name: "Participant Name" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
	});
});
