import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  multiSearch,
  resetSearchResult,
  searchTV,
  resetSearchTvResult,
} from "../store";
import { auth } from "../App";

export default function Navbar({ isScrolled }) {
  // const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");

  // const [searchTv, setSearchTv] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "Tv Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  useEffect(() => {
    search();
  }, [searchText, dispatch]);

  useEffect(() => {
    search();
  }, [searchText, dispatch]);

  const search = useCallback(() => {
    if (searchText.trim().length > 0) {
      dispatch(multiSearch(searchText));
    } else if (searchText === "") {
      dispatch(resetSearchResult());
    }
  }, [searchText, dispatch]);

  const searchForTv = useCallback(() => {
    if (searchText.trim().length > 0) {
      dispatch(searchTV(searchText));
    } else if (searchText === "") {
      dispatch(resetSearchTvResult());
    }
  }, [searchText, dispatch]);

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                e.preventDefault();
                setSearchText(e.target.value);
              }}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <div className="profile_avatar">
            <img
              onClick={() => navigate("/profile")}
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
          </div>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .profile_avatar {
    img {
      height: 2rem;
      cursor: pointer;
    }
  }
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
