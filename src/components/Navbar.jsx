import React from "react";

const Navbar = () => {
  return (
    <>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo right">
            LogOut
          </a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <a href="sass.html">HOME</a>
            </li>
            <li>
              <a href="badges.html">Employee List</a>
            </li>
            <li>
              <a href="collapsible.html"></a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
