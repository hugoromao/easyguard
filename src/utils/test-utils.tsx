import { NextUIProvider } from "@nextui-org/react";
import { render, RenderOptions } from "@testing-library/react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

import {
  GlobalContext,
  GlobalContextType,
  GlobalContextDefaultValues,
} from "@/context/global";

type CustomRenderProps = {
  globalProviderProps?: GlobalContextType;
} & Omit<RenderOptions, "queries">;

const customRender = (
  ui: React.ReactElement,
  {
    globalProviderProps = GlobalContextDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {},
  router?: Partial<AppRouterInstance>
) => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };

  return render(
    <NextUIProvider>
      <AppRouterContext.Provider value={mockedRouter}>
        <GlobalContext.Provider value={globalProviderProps}>
          {ui}
        </GlobalContext.Provider>
      </AppRouterContext.Provider>
    </NextUIProvider>,
    renderOptions
  );
};

export * from "@testing-library/react";
export { customRender as render };
