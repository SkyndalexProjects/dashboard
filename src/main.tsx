import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { makeStore } from "./store.ts";
import "./index.css";
import App from "./App.tsx";
const store = makeStore();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
