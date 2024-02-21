import { fireEvent, render, screen } from "@testing-library/react";

import NewPasswordForm from ".";

describe("<NewPasswordForm", () => {
  it("should not render is not active", () => {
    const { container } = render(
      <NewPasswordForm
        active={false}
        setActive={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render correctly", () => {
    const form = render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getAllByText(/Este campo é obrigatório/u).length).toEqual(4);
  });

  it("should throw an error if the 'words' have small words.", () => {
    render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Adicionar palavra/i }));

    expect(screen.getAllByRole("textbox").length).toBe(5);
  });

  it("should remove a textbox field when the trash button is clicked", () => {
    render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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

  it("should call setActive function when close button is clicked", () => {
    const setActiveMock = jest.fn();
    render(
      <NewPasswordForm
        active
        setActive={setActiveMock}
        onSubmitPasswordForm={() => ({})}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "close" }));

    expect(setActiveMock).toHaveBeenCalledWith(false);
  });

  it("should render the next step correctly", () => {
    render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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

    expect(screen.getByText("Ultima etapa"));
    expect(
      screen.getByText(
        "Agora vamos precisar de dois números significativos para você. Não vale usar datas de nascimento, idade ou qualquer informação muito óbvia sobre você."
      )
    );
    expect(screen.getAllByRole("textbox").length).toBe(2);
    expect(screen.getByRole("button", { name: "Adicionar número" }));
    expect(screen.getByRole("button", { name: "next" }));
  });

  it('should go back to the previous step when "Go Back" button is clicked', () => {
    render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
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
        active
        setActive={() => ({})}
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

    expect(screen.getAllByRole("textbox").length).toBe(3);
  });

  it("should remove a textbox field when the trash button is clicked", () => {
    render(
      <NewPasswordForm
        active
        setActive={() => ({})}
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

    expect(screen.getAllByRole("textbox").length).toBe(2);
  });

  it("should call onSubmitPasswordForm", () => {
    const setActiveMock = jest.fn();
    const onSubmitPasswordForm = jest.fn();

    render(
      <NewPasswordForm
        active
        setActive={setActiveMock}
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
      'generatePassword?words=["Palavra 1","Palavra 2","Palavra 3","Palavra 4"]&numbers=["123","456"]'
    );
  });
});
