import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/10 backdrop-blur-xl border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AgriVision" className="h-8 w-8" />
          <span className="font-heading text-xl font-bold text-primary-foreground">AgriVision</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Features</a>
          <a href="/#contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a>
          <Link to="/farmer-dashboard" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Dashboard</Link>
          <Link to="/chats" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Chats</Link>
          <Link to="/disease-detect" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Disease Detect</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground" onClick={signOut}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-primary-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-xl border-t border-primary-foreground/10 p-4 space-y-3">
          <a href="/#features" className="block text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Features</a>
          <a href="/#contact" className="block text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Contact</a>
          <Link to="/farmer-dashboard" className="block text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/chats" className="block text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Chats</Link>
          <Link to="/disease-detect" className="block text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Disease Detect</Link>
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm" className="flex-1 border-primary-foreground/30 text-primary-foreground">
                  <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => { signOut(); setOpen(false); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="flex-1 border-primary-foreground/30 text-primary-foreground">
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
