import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandMark from "@/components/BrandMark";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <BrandMark textClassName="text-foreground" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Features</a>
          <a href="/#contact" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Contact</a>
          <Link to="/farmer-dashboard" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Dashboard</Link>
          <Link to="/chats" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Chats</Link>
          <Link to="/disease-detect" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Disease Detect</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-foreground hover:bg-muted">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted" onClick={signOut}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-foreground hover:bg-muted">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild size="sm" className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 p-4 space-y-3 md:hidden">
          <a href="/#features" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Features</a>
          <a href="/#contact" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Contact</a>
          <Link to="/farmer-dashboard" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/chats" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Chats</Link>
          <Link to="/disease-detect" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Disease Detect</Link>
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm" className="flex-1 border-border text-foreground">
                  <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => { signOut(); setOpen(false); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="flex-1 border-border text-foreground">
                  <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-primary text-primary-foreground">
                  <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
