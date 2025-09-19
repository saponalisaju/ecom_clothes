import React from "react";
import "./HelpCenter.css";
import orders from "../Assets/all_order";

const HelpCenter = () => {
  const chunckedOrders = [];
  for (let i = 0; i < orders.length; i += 3) {
    chunckedOrders.push(orders.slice(i, i + 3));
  }

  return (
    <div className="help_content">
      <div className="help_center">
        <div className="heading_text">
          <h2 className="question_head">You got a problem?</h2>
          <p className="question">
            Don't worry we will help you do to solve the problem?
          </p>
        </div>
        <input
          type="text"
          className="search"
          placeholder="Search a problems    "
        />
        <div className="otp_text">
          <img src="" alt="" />
          <p>Bowaro! Identity Theft </p>
          <p>Don't give your OTP code to other.</p>
        </div>
      </div>
      <div className="question_category">
        <h1>Popular Questions</h1>
        <img src="" alt="" />
        <p>How to create complain? arrow button</p>
      </div>

      <div className="problem_category">
        <div id="carouselHelpFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            {chunckedOrders.map((group, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="d-flex justify-content-center">
                  {group.map((order, idx) => (
                    <div className="text-center mx-2" key={idx}>
                      <img className="d-block w-100" src={order.image} alt="" />
                      <p className="problem_name ">{order.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselHelpFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselHelpFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
