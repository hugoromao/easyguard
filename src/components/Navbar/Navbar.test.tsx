import { usePathname } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@/utils/test-utils";
import Navbar from ".";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("<Navbar />", () => {
  it("renders the home icon with solid style when on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/");

    const { getByLabelText } = render(<Navbar />);

    expect(getByLabelText("home-icon-solid"));
  });

  it("renders the home icon with outline style when not on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/some-other-page");

    const { getByLabelText } = render(<Navbar />);

    expect(getByLabelText("home-icon-outline"));
  });

  it("renders the badge icon with solid style when on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/achivements");
    const { getByLabelText } = render(<Navbar />);
    expect(getByLabelText("gift-icon-solid"));
  });

  it("renders the badge icon with outline style when not on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/some-other-page");
    const { getByLabelText } = render(<Navbar />);
    expect(getByLabelText("gift-icon-outline"));
  });

  it("renders the config icon with solid style when on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/settings");

    const { getByLabelText } = render(<Navbar />);

    expect(getByLabelText("cog-icon-solid"));
  });

  it("renders the config icon with outline style when not on home page", () => {
    (usePathname as jest.Mock).mockReturnValueOnce("/some-other-page");

    const { getByLabelText } = render(<Navbar />);

    expect(getByLabelText("cog-icon-outline"));
  });

  it("should render correctly", () => {
    const component = render(<Navbar />);
    expect(screen.getAllByRole("link").length).toEqual(3);
    expect(screen.getByRole("button", { name: /nova-senha/i }));
    expect(component).toMatchSnapshot();
  });

  it("should open the new password modal", async () => {
    const onOpen = jest.fn();
    render(<Navbar />, {
      globalProviderProps: {
        isOpen: true,
        onOpen,
        onPasswordTypeOpen: onOpen,
        onClose: jest.fn(),
        goParty: jest.fn(),
        onOpenChange: jest.fn(),
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "nova-senha" }));
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });
});
