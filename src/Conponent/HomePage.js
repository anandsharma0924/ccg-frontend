/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from "react";
import "../CSS/HomePage.css";
// import img2 from "./img-2.png";
import img2 from "../assets/img-2.png";
// import img3 from "./img-45.png";
import img3 from "../assets/img-45.png";
// import img4 from "./img-4.jpeg";
import img4 from "../assets/img-4.jpeg";
// import img12 from "./img-12.jpeg";
import img12 from "../assets/img-12.jpeg";
import { Navbar } from "./Navbar";

import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

const images = [img2, img12, img3, img4];
const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <React.Fragment>
      <Navbar />

      <div className="home">
        <section className="hero">
          <div className="hero-content">
            <h1>Empowering Your Future</h1>
            <p>
              Your success is our priority. Join us and take the next step in
              your journey.
            </p>
            <a href="#services" className="cta-button">
              Get Started
            </a>
          </div>
          <div className="slider , img">
            <img
              src={images[currentImage]}
              alt={`Slide ${currentImage + 1}`}
              className="slider-image"
              loading="lazy"
            />
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>

          <div class="grid-container ,grid">
            <div class="grid-item">
              <h3>Future Of Tuition Classes</h3>

              <p>
                Smart classes is world's best cloud based tuition management
                system with all in one solutions for coaching classes. Manage
                your single or multibranch institues from anywhere and anytime.
              </p>
            </div>
            <div class="grid-item">
              <h3>Trusted by 1000+ Institutes</h3>
              <p>
                1000+ Coaching institutes in 23+ states across India & 7+
                countries for over 7 years, backed by award winning service.
              </p>
            </div>
            <div class="grid-item">
              <h3>Features Loaded</h3>
              <p>
                Smart Classes has everything to make your Tuition Classes run
                smoothly. Our mission is to provide all possible features
                through one single platform.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <h2 className="key">Key Features</h2>

          <div class="grid-container ,grid">
            <div class="grid-item">
              <i
                className="material-icons"
                style={{ fontSize: "48px", color: "lightgreen" }}
              >
                autorenew
              </i>
              <h3>Enquiry Management</h3>

              <p>
                Submit student enquiry and manage followup or calling history.
                Use lead generator page to get enquiry from other platform.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              {" "}
              <i
                className="fa fa-graduation-cap"
                style={{ fontSize: "48px", color: "lightgreen" }}
              ></i>
              <h3>Student Management</h3>
              <p>
                Manage student's personal and educational details. Take student
                attendance from mobile app or by biometric device. Share
                assignments with students.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              {" "}
              <i
                className="material-icons"
                style={{ fontSize: "36px", color: "lightgreen" }}
              >
                group
              </i>
              <h3>Staff Management</h3>
              <p>
                Manage your staff records and allow your staff to login & use
                the smart classes system with total security control by screen
                rights & action rights.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              <i
                class="fa fa-gears"
                style={{ fontSize: "48px", color: "lightgreen" }}
              ></i>
              <h3>Share Digital Courses</h3>
              <p>
                Create & upload your digital courses in videos or documents
                format securly & share with students.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              {" "}
              <i
                className="material-icons"
                style={{ fontSize: "48px", color: "lightgreen" }}
              >
                textsms
              </i>
              <h3>Send SMS/App Notifications/Whatsapp Message</h3>
              <p>
                Send automatic & manual SMS, mobile app push notification &
                WhatsApp message to students and parents. System will send alert
                on all processes like on registration, attendance, fees, exam
                and many more.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              <i
                className="fa fa-users"
                style={{ fontSize: "36px", color: "lightgreen" }}
              ></i>
              <h3>Expense Management</h3>
              <p>
                Manage your coaching institute's all expenses with expense
                header and track your yearly profit and loss. Expense report
                will help you to control your unnecessary expenses.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              <i
                class="fa fa-trophy"
                style={{ fontSize: "48px", color: "lightgreen" }}
              ></i>
              <h3>Automatic Certificate Generator</h3>
              <p>
                Create students course completion or exam completion certificate
                automatically in bulk. Download certificate in pdf format &
                print the certificate on any printer.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              <i
                class="fas fa-user-graduate"
                style={{ fontSize: "48px", color: "lightgreen" }}
              ></i>
              <h3>Analysis Reports</h3>
              <p>
                Track students overall performance and also track your
                educational institute growth with different type of analysis
                reports. Easily monitor & analyse fees collection growth,
                analyse expenses, students inquiry and conversion growth & many
                more.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <div class="grid-item">
              <i
                className="fa fa-folder-open"
                style={{ fontSize: "36px", color: "lightgreen" }}
              ></i>

              <h3>Mobile App</h3>
              <p>
                Manage tuition classes all daily activity from any where & from
                any device. Student can perform all the action from their mobile
                app like attend online MCQ exams, attend live classes, check
                exam, fees, attendance performance as well.
              </p>
       <button className="view-more-button">View More</button>
            </div>
            <button className="view-more-button">CHECK ALL FEATURES</button>
          </div>
        </section>

        <footer id="contact" className="footer">
          <div className="footer-content">
            <h2>Contact Us</h2>
            <MDBFooter className="text-center" color="white">
              <MDBContainer className="p-4">
                <section className="mb-4">
                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="facebook-f" />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="twitter" />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="google" />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="instagram" />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="linkedin-in" />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab icon="github" />
                  </MDBBtn>
                </section>

                <section className="">
                  <form action="">
                    <MDBRow className="d-flex justify-content-center">
                      <MDBCol size="auto">
                        <p className="pt-2">
                          <strong>Sign up for our newsletter</strong>
                        </p>
                      </MDBCol>

                      <MDBCol md="5" start>
                        <MDBInput
                          contrast
                          type="email"
                          label="Email address"
                          className="mb-4"
                        />
                      </MDBCol>

                      <MDBCol size="auto">
                        <MDBBtn
                          outline
                          color="light"
                          type="submit"
                          className="mb-4"
                        >
                          Subscribe
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </section>
              </MDBContainer>
            </MDBFooter>
            <a href="mailto:info@coachingpro.com" className="cta-button">
              Email Us
            </a>
          </div>
          <br />
          <div className="footer-bottom">
            <p>&copy; 2024 CoachingPro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
