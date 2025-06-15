import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ParticipantForm from './ParticipantForm'

describe("ParticipantForm", () => {
    it("renders the form with input and add button", () => {
        render(<ParticipantForm />)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument()
    });

    it("adds a participant when the form is submitted", () => {
        render(<ParticipantForm />)

        const input = screen.getByRole("textbox")
        const button=screen.getByRole("button", {name: "Add"})

        fireEvent.change(input,{target: {value: "John Smith"}})
        fireEvent.click(button)
        
        expect(screen.getByText("John Smith")).toBeInTheDocument()
    })
})