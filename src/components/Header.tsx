import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('common.home'), href: "/" },
    { name: t('common.caseStudies'), href: "/case-studies" },
    { name: t('common.blog'), href: "/blog" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              VersionUp
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              activeClassName="text-primary"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {t('common.welcome')}, {user.user_metadata?.first_name || user.email?.split('@')[0]}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                {t('common.signOut')}
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">{t('common.login')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('common.getStarted')}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-6 mt-6">
              {/* Mobile Logo */}
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">VersionUp</span>
              </Link>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-md hover:bg-accent"
                    activeClassName="text-primary bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">{t('common.language')}</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">{t('common.theme')}</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Signed in as {user.user_metadata?.first_name || user.email?.split('@')[0]}
                    </div>
                    <Button variant="outline" onClick={handleSignOut} className="w-full">
                      {t('common.signOut')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t('common.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        {t('common.getStarted')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;