import React from "react";
import "./CSS/Exce.css";
import banner1 from "../Assets/banner3.jpg";
import banner2 from "../Assets/banner2.jpg";
import banner3 from "../Assets/banner1.jpg";
import AboutUsNavbar from "../NavbarItems/AboutUsNavbar";

const Exce = () => {
  return (
    <div className="contain">
      <AboutUsNavbar />
      <div className="exce_info">
        <div className="about_us_top">
          <h1 className="about_us_heading">ABOUT US</h1>
          <div className="about_us_image">
            <img src={banner1} alt="" />
            <div className="about_us_text">
              <h2 className="heading_two">Exce.</h2>
              <p className="about_us_desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus enim omnis voluptatum, provident veniam, at dolorum
                sint unde recusandae vero quis reiciendis velit qui, praesentium
                fugit impedit! Dicta, quidem explicabo?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about_us_history">
        <div className="about_us_his_desc">
          <img src={banner3} alt="" />
          <div className="about_us_middle">
            <h2>History of the brand</h2>
            <p className="history_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              minus earum necessitatibus, dolore error at quae veniam! Aperiam
              aut odit quam nostrum nulla at temporibus, iste consectetur
              inventore reiciendis maxime?
            </p>
            <p className="history_desc2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
              voluptatum repudiandae optio facere, error quisquam? Officiis.
            </p>
          </div>
        </div>
      </div>
      <div className="about_us_bottom">
        <div className="about_us_bottom_desc">
          <h3>OUR PROMISE</h3>
          <p className="bottom_desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            ex voluptatem harum provident commodi vero voluptatibus officia
            magni illum perspiciatis aperiam nam possimus expedita, iste
            adipisci illo libero dolore doloremque!
          </p>
          <img src={banner2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Exce;
