import { MotionConfig } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* `reducedMotion="user"` makes every Framer Motion animation respect the
        OS "reduce motion" setting (transforms become instant, opacity stays).
        The CSS @keyframes are already gated in index.css. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
