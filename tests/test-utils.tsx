import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render } from "@testing-library/react";
import { WrapperComponent, renderHook } from "@testing-library/react-hooks";
import { createRouter } from "next/router";
import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { reducer } from "store";

import { mockedInitialState } from "./mock/mockedStore";

const queryClient = new QueryClient();
const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer,
      preloadedState: { ...mockedInitialState, ...preloadedState },
    }),
    ...renderOptions
  }: Omit<RenderOptions, "wrapper"> | any = {}
) => {
  const AllTheProviders: FC = ({ children }) => {
    // @ts-ignore
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

const hookTestWrapper = ((): WrapperComponent<undefined> => {
  const store = configureStore({
    reducer,
    preloadedState: { ...mockedInitialState },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
  return wrapper as unknown as WrapperComponent<undefined>;
})();

export * from "@testing-library/react";
export { customRender as render };
export { hookTestWrapper };
