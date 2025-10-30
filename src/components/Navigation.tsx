import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
            🐾 Pawfect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/browse") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Browse Pets
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/evaluation"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/evaluation") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              HCI Evaluation
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 animate-in slide-in-from-top">
            <Link
              to="/"
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive("/browse") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Pets
            </Link>
            <Link
              to="/contact"
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/evaluation"
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive("/evaluation") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              HCI Evaluation
            </Link>
            {user ? (
              <>
                <div className="py-2 text-sm text-muted-foreground border-t">
                  {user.email}
                </div>
                <Button className="w-full" variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
