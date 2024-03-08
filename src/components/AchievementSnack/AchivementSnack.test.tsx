import { render, screen } from "@/utils/test-utils";
import AchivementSnack from ".";

test("renders the AchivementSnack component", () => {
  render(
    <AchivementSnack
      id={1}
      variant="info"
      hideIconVariant
      iconVariant={{}}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      style={{}}
      persist={false}
      message="O início da jornada!:Crie sua primeira senha."
    />
  );

  expect(screen.getByText("O início da jornada!"));
  expect(screen.getByText("Crie sua primeira senha."));
});
