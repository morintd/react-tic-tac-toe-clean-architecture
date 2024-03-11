import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DependencyContextProvider } from "./dependency-context-provider";
import { Home } from "../tic-tac-toe/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <DependencyContextProvider>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </DependencyContextProvider>
    </React.StrictMode>
  );
}
