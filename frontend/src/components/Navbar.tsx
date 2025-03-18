import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginForm from "./LoginForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const location = useLocation(); 

  // ✅ Automatically close popover if route is `/login`
  useEffect(() => {
    if (location.pathname === "/login") {
      setShowPopover(false);
    }
  }, [location.pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
  ];

  return (
    <nav className="flex items-center justify-between p-4 md:px-8 shadow-md">
      <h1 className="text-2xl font-bold">React Ma</h1>

      {/* Navigation Links */}
      <NavigationMenu
        className={`absolute rounded-lg transition-all duration-300 top-20 w-4/5 left-1/3 -translate-x-1/2 
          md:static md:left-0  md:translate-x-0 md:w-auto md:shadow-none md:flex
          ${isOpen ? "block" : "hidden"}`}
      >
        <NavigationMenuList
          className="flex flex-col p-4 rounded-8 space-y-4 text-center bg-gray-500 w-100 
          md:flex-row md:space-y-0 md:space-x-8 md:p-0 md:bg-transparent"
        >
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link
                to={item.href}
                className="block px-3 py-2 w-24 hover:text-blue-500"
              >
                {item.name}
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className="block md:hidden">
            <Link to="/login">
              <ShimmerButton className="shadow-2xl">
                <span className="text-sm font-medium text-white lg:text-lg">
                  Login
                </span>
              </ShimmerButton>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Button */}
      <button
        className="p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Search and Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Input
          className="hidden w-full max-w-xs sm:block"
          placeholder="Search"
        />
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <Link
              to="/login"
              // onMouseEnter={() => setShowPopover(true)}
              // onMouseLeave={() => setShowPopover(false)}
            >
              <ShimmerButton className="shadow-2xl">
                <span className="text-sm font-medium text-white lg:text-lg">
                  Login
                </span>
              </ShimmerButton>
            </Link>
          </PopoverTrigger>
          <PopoverContent
            className="w-100"
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
          >
            <LoginForm />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
