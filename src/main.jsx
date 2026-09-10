import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7C3AED",
          colorPrimaryHover: "#6D28D9",
          colorPrimaryActive: "#5B21B6",
          borderRadius: 12,
        },
      }}
    >
     <Provider store={store}>
      <RouterProvider router={router}/>
    <Toaster/>
    </Provider>
    </ConfigProvider>
  </StrictMode>
);