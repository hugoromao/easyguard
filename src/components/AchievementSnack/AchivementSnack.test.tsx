import { render } from "@/utils/test-utils";
import AchivementSnack from ".";

test("renders the AchivementSnack component", () => {
  const { getByText } = render(
    <AchivementSnack
      id={1}
      variant="info"
      hideIconVariant
      iconVariant={{}}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      style={{}}
      persist={false}
      message="Title:Description"
    />
  );

  expect(getByText("Title"));
  expect(getByText("Description"));
});
