import { MoonIcon } from "lucide-react";

const Header = () => {
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
        <button className="btn btn-sm btn-ghost">
          <MoonIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
