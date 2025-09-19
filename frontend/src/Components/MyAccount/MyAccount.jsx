import React from "react";
import "./MyAccount.css";

import { NavLink, useLocation } from "react-router-dom";

import AccountNavbar from "../NavbarItems/AccountNavbar";

const MyAccount = () => {
  const location = useLocation();

  return (
    <div>
      <AccountNavbar />
      <div className="account_body">
        <div className="account_setting relative">
          <div className="sub-nav">
            <NavLink
              className={`homepage ${
                location.pathname === "/" ? "active-link" : ""
              }`}
              to="/"
            >
              Homepage
            </NavLink>
            &nbsp;/&nbsp;
            <NavLink
              className={`homepage ${
                location.pathname === "/account" ? "active-link" : ""
              }`}
              to="/account"
            >
              My Account
            </NavLink>
          </div>
          <div className=" account_main_conternt">
            <ul className="account_list">
              <li>
                <h1>My Account</h1>
              </li>
              <li>
                <img src="" alt="" />
                <NavLink to="">My details</NavLink>
              </li>
              <li>
                <img src="" alt="" />
                <NavLink to="/checkout">My address book</NavLink>
              </li>
              <li>
                <img src="" alt="" />
                <NavLink to="/cart">My orders</NavLink>
              </li>
              <li>
                <img src="" alt="" />
                <NavLink to="">My newletters</NavLink>
              </li>
              <li>
                <img src="" alt="" />
                <NavLink to="">Account settings</NavLink>
              </li>
            </ul>

            <div className="account_detail_form ">
              <h3>My detalis</h3>
              <p>Personal information</p>
              <hr />
              <div className="form_data">
                <div className="form_data_item d-flex">
                  <p className="">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolorem cupiditate illo delectus deserunt veniam
                    perferendis! .
                  </p>
                  <form action="">
                    <div className="d-flex pb-5 gap-4">
                      <div className="mb-3 flex-column d-flex">
                        <label htmlFor="">FIRST NAME</label>
                        <input type="text" />
                      </div>
                      <div className="mb-3 flex-column d-flex">
                        <label htmlFor="">SECOND NAME</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="mb-5 d-flex flex-column w-25">
                      <label htmlFor="">BIRTH DATE</label>
                      <input type="date" />
                    </div>
                    <div className=" d-flex flex-column w-25 mb-2">
                      <label htmlFor="">PHONE NUMBER</label>
                      <input type="text" />
                    </div>
                    <button>SAVE</button>
                  </form>
                </div>

                <div>
                  <p>E-mail address</p>
                  <hr />
                  <div className="email_form d-flex">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptates quae corrupti dolores non necessitatibus
                      reprehenderit voluptatum, .
                    </p>
                    <div className="d-flex flex-column">
                      <label htmlFor="">E-MAIL ADDRESS</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
