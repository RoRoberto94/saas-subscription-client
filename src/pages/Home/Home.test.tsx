import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./index";

// A simple component test to ensure the landing page renders correctly.
describe("HomePage", () => {
  it("renders the main heading and call-to-action button", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /manage your subscriptions effortlessly/i,
    });

    const ctaButton = screen.getByRole("link", { name: /view plans/i });

    expect(heading).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });
});
