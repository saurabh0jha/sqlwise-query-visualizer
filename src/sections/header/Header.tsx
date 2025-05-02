import { useTheme } from "@/store/themeProvider";
import { GithubIcon, MoonIcon, SunIcon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 bg-background flex items-center justify-between px-4 py-4 border-b border-border">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl text-accent font-semibold">QueryWise</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <p className="text-md text-muted-foreground">Saurabh Ojha</p>
          <small className="text-sm text-muted-foreground">Data Analyst</small>
        </div>
        {theme === "light" || theme === "system" ? (
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon />
          </button>
        ) : null}
        {theme === "dark" || theme === "system" ? (
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setTheme("light")}
          >
            <SunIcon />
          </button>
        ) : null}
        <button
          className="btn btn-sm btn-ghost"
          onClick={() =>
            window.open(
              "https://github.com/saurabh0jha/sqlwise-query-visualizer",
              "_blank"
            )
          }
        >
          <GithubIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
