import React from "react";
import { Link } from "@reach/router";

function Header(props) {
  return (
    <header>
      <h1>Hello</h1>
      <nav>
        <li>
          <Link to="/">Home</Link>
          <Link to="/students">Students</Link>
          <Link to="/blocks">Block Review</Link>
        </li>
      </nav>
    </header>
  );
}

export default Header;
