import React from "react";

function Header() {
  return (
    <header className="bg-food-card border-b border-food-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl text-red-300">TastyBites</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Search className="h-5 w-5 text-food-muted" /> */}
              </div>
              <input
                type="text"
                placeholder="Search for delicious food..."
                className="block w-full pl-10 pr-3 py-2 border border-food-border rounded-full 
                         bg-food-bg text-food-text placeholder-food-muted focus:outline-none 
                         focus:ring-2 focus:ring-food-primary focus:border-transparent 
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side buttons */}
          {/* <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-food-text hover:bg-food-bg"
            >
              <Star className="h-5 w-5 mr-2" />
              Favorites
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-food-text hover:bg-food-bg relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              <span
                className="absolute -top-1 -right-1 h-5 w-5 bg-food-primary text-primary-foreground 
                             rounded-full text-xs flex items-center justify-center"
              >
                3
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-food-text hover:bg-food-bg"
            >
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
