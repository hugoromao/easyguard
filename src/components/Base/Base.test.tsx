import { render, screen } from "@/utils/test-utils";
import Base from ".";

jest.mock("@uidotdev/usehooks", () => ({
  useLocalStorage: jest.fn(() => [false, jest.fn()]),
}));

describe("<Base />", () => {
  it("should render correctly", () => {
    const component = render(<Base>test</Base>);

    expect(screen.getByText(/test/i));
    expect(component).toMatchSnapshot();
  });
});
