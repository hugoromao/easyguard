import React from "react";
import { useIsClient } from "@uidotdev/usehooks";

import { render } from "@/utils/test-utils";

import { ClientOnly } from ".";

jest.mock("@uidotdev/usehooks", () => ({
  useIsClient: jest.fn(() => true),
}));

describe("ClientOnly component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children when isClient is true", () => {
    const { getByText } = render(
      <ClientOnly>
        <div>Child Component</div>
      </ClientOnly>
    );
    expect(getByText("Child Component"));
  });

  it("should not render children when isClient is false", () => {
    (useIsClient as jest.Mock).mockReturnValue(false);

    const { queryByText } = render(
      <ClientOnly>
        <div>Child Component</div>
      </ClientOnly>
    );
    expect(queryByText("Child Component")).toBeNull();
  });
});
