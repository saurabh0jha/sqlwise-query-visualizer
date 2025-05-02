import { useTheme } from "@/store/themeProvider";
import { GithubIcon, MoonIcon, SunIcon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="h-16 bg-background flex items-center justify-between px-4 py-4 border-b border-border"
      role="banner"
    >
      <div className="flex items-center gap-6">
        <h1
          className="text-2xl text-accent font-semibold"
          role="heading"
          aria-level={1}
        >
          QueryWise
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col" role="contentinfo">
          <p className="text-md text-muted-foreground">Saurabh Ojha</p>
          <small className="text-sm text-muted-foreground">Data Analyst</small>
        </div>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark mode"
          role="switch"
          data-active={theme === "light"}
          title="Switch to dark mode"
        >
          <MoonIcon aria-hidden="true" />
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
          role="switch"
          data-active={theme === "dark"}
          title="Switch to light mode"
        >
          <SunIcon aria-hidden="true" />
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() =>
            window.open(
              "https://github.com/saurabh0jha/sqlwise-query-visualizer",
              "_blank"
            )
          }
          aria-label="View project on GitHub"
        >
          <GithubIcon aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;
