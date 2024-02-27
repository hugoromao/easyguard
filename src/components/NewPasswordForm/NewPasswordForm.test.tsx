import { fireEvent, render, screen } from "@testing-library/react";

import NewPasswordForm from ".";

describe("<NewPasswordForm", () => {
  it("should not render is not active", () => {
    const { container } = render(
      <NewPasswordForm
        isOpen={false}
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render correctly", () => {
    const form = render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    expect(screen.getAllByRole("textbox").length).toBe(4);
    expect(screen.getByRole("button", { name: "next" }));

    expect(form).toMatchSnapshot();
  });

  it("should throw an error if the 'words' fields are empty.", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getAllByText(/Este campo é obrigatório/u).length).toEqual(4);
  });

  it("should throw an error if the 'words' have small words.", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/A palavra “ab” é menor que três caracteres\./i));
  });

  it("should throw an error if the 'words' have common words.", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "comum" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/comum é uma palavra muito comum/i));
  });

  it("should throw an error if the 'words' have keyboard patterns.", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "qwerty" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/Não utilize padrões de teclado/i));
  });

  it('should add a textbox field when the "Adicionar palavra" button is clicked', () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Adicionar palavra/i }));

    expect(screen.getAllByRole("textbox").length).toBe(5);
  });

  it("should remove a textbox field when the trash button is clicked", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    const addTextboxButton = screen.getByRole("button", {
      name: /Adicionar palavra/i,
    });

    fireEvent.click(addTextboxButton);
    fireEvent.click(screen.getByRole("button", { name: "remove" }));

    expect(screen.getAllByRole("textbox").length).toBe(4);
  });

  it("should render the next step correctly", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(screen.getByText("Última etapa"));
    expect(
      screen.getByText(
        "Agora vamos precisar de dois números significativos para você. Não vale usar datas de nascimento, idade ou qualquer informação muito óbvia sobre você."
      )
    );
    expect(screen.getAllByRole("spinbutton").length).toBe(2);
    expect(screen.getByRole("button", { name: "Adicionar número" }));
    expect(screen.getByRole("button", { name: "next" }));
  });

  it('should go back to the previous step when "Go Back" button is clicked', () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    fireEvent.click(screen.getByRole("button", { name: "goBack" }));

    expect(screen.getByText("Vamos criar uma nova senha!"));
  });

  it("should throw an error if the 'numbers' fields are empty.", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(screen.getAllByText(/Este campo é obrigatório/u).length).toEqual(2);
  });

  it('should add a textbox field when the "Adicionar número" button is clicked', () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar número" }));

    expect(screen.getAllByRole("spinbutton").length).toBe(3);
  });

  it("should remove a textbox field when the trash button is clicked", () => {
    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar número" }));
    fireEvent.click(screen.getByRole("button", { name: "remove" }));

    expect(screen.getAllByRole("spinbutton").length).toBe(2);
  });

  it("should call onSubmitPasswordForm", () => {
    const onSubmitPasswordForm = jest.fn();

    render(
      <NewPasswordForm
        isOpen
        onOpenChange={() => ({})}
        onSubmitPasswordForm={onSubmitPasswordForm}
      />
    );

    fireEvent.change(screen.getByLabelText("Palavra 1"), {
      target: { value: "Palavra 1" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 2"), {
      target: { value: "Palavra 2" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 3"), {
      target: { value: "Palavra 3" },
    });
    fireEvent.change(screen.getByLabelText("Palavra 4"), {
      target: { value: "Palavra 4" },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));

    fireEvent.change(screen.getByLabelText("Número 1"), {
      target: { value: 123 },
    });
    fireEvent.change(screen.getByLabelText("Número 2"), {
      target: { value: 456 },
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(onSubmitPasswordForm).toHaveBeenCalledTimes(1);
    expect(onSubmitPasswordForm).toHaveBeenCalledWith(
      "generatePassword?words=%5B%22Palavra+1%22%2C%22Palavra+2%22%2C%22Palavra+3%22%2C%22Palavra+4%22%5D&numbers=%5B%22123%22%2C%22456%22%5D"
    );
  });
});
