import { render } from "@testing-library/react";
import App from "./App";
import { LocaleProvider } from "./contexts/Locale";

test("renders app shell", () => {
    const { container } = render(
        <LocaleProvider>
            <App />
        </LocaleProvider>,
    );
    expect(container.querySelector("main")).toBeInTheDocument();
});
