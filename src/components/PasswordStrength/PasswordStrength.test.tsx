import { render } from "@/utils/test-utils";
import PasswordStrength from ".";

describe("PasswordStrength component", () => {
  it("renders with emoji and title when entropy is high", () => {
    const { getByText } = render(<PasswordStrength entropy={200} />);
    expect(getByText("🎉"));
    expect(getByText("Sua senha é Incrível!"));
  });

  it("renders with emoji and title when entropy is medium", () => {
    const { getByText } = render(<PasswordStrength entropy={100} />);
    expect(getByText("🔒"));
    expect(getByText("Sua senha é forte"));
  });

  it("renders with emoji and title when entropy is low", () => {
    const { getByText } = render(<PasswordStrength entropy={30} />);
    expect(getByText("⚠️"));
    expect(getByText("Sua senha não é segura"));
  });
});
