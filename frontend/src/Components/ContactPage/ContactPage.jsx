import React from "react";
import "./ContactPage.css";
import ContactNavbar from "../NavbarItems/ContactNavbar";

const ContactPage = () => {
  return (
    <div className="contact_main">
      <ContactNavbar />
      <div className="contact_info">
        <div className="hero_section">
          <h1 className="heading_info">CONTACT</h1>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            quasi commodi ducimus amet quaerat dolore tempora facere. Dolorum
            perspiciatis nihil debitis tempore possimus, enim laudantium veniam
            maiores ipsum praesentium non.
          </p>
        </div>
        <div className="form_field">
          <form action="" className="form_data">
            <div className="user_info">
              <div className="username">
                <label htmlFor="">Your Name(required)</label>
                <input type="text" className="name_input" />
              </div>
              <div className="useremail">
                <label htmlFor="">Your Email(required)</label>
                <input type="text" className="email_input" />
              </div>
            </div>
            <div className="usermessage">
              <label htmlFor="">Your Message</label>
              <textarea
                rows="10"
                cols="15"
                type="text"
                className="message_input"
              ></textarea>
            </div>
            <button className="btn fst-italic btn-warning">SEND</button>
          </form>
        </div>
      </div>
      <div className="footer_area">
        <div className="pages">
          <span>PAGES</span>
          <span>Home</span>
        </div>
        <div className="social">
          <span>SOCIAL</span>
          <span>solo</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
