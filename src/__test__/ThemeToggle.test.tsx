import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  test("should render button with correct initial state from localStorage (light mode by default)", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    
    expect(button).toHaveTextContent("🌙"); // Default is light mode
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("should render button with correct initial state if localStorage is dark mode", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("☀️"); // Dark mode is active
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("should toggle theme on button click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    // Click to enable dark mode
    fireEvent.click(button);
    expect(button).toHaveTextContent("☀️");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click to disable dark mode
    fireEvent.click(button);
    expect(button).toHaveTextContent("🌙");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("should persist theme selection in localStorage", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button); // Switch to dark mode
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button); // Switch back to light mode
    expect(localStorage.getItem("theme")).toBe("light");
  });
});

