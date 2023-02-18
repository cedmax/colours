import React, { memo } from "react";
import { ThemeProvider } from "@emotion/react";
import Template from "./components/Template";
import Loader from "./components/Loader";
const Body = React.lazy(() => import("./components/Body"));

export default memo(() => {
  return (
    <ThemeProvider
      theme={{
        opacity: 0.6,
        lightOpacity: 0.5,
      }}
    >
      <Template>
        <React.Suspense fallback={<Loader />}>
          <Body />
        </React.Suspense>
      </Template>
    </ThemeProvider>
  );
});
