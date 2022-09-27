import React from "react";
import SearchBar from "../landingPage/searchBar/SearchBar";
import { Link } from "react-router-dom";
import logo from "../../assets/foodie-alliance-logo.png";

const NavBar = (props) => {
  return (
    <React.Fragment>
      <Link to="/">
        <img src={logo} alt="logo" width="75px" />
      </Link>
      <SearchBar
        term={props.term}
        location={props.location}
        search={props.search}
      />
      <button>Sign In</button>
      <button>Sign Up</button>
      <hr />
    </React.Fragment>
  );
};

export default NavBar;
