import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          {/* Your navigation links go here */}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default Layout;
