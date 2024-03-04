import React from "react";
import Tips from ".";
import { render, screen } from "@/utils/test-utils";

describe("Tips component", () => {
  it("should render the tip after loading", async () => {
    render(<Tips />);
    expect(screen.findByText(/Você sabia\?/i));
    expect(screen.getByLabelText("tip"));
  });
});
