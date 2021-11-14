import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";



export const OutpassForm = () => {
  const history = useHistory();
  const handler = () => {
    history.push("/complaint-list");
  };
  const showDate = new Date();
  const date =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear();

  const [startDate, setStartDate] = useState(new Date());

  const [userData, setUserData] = useState({
    Reason: "",
    Location: "",
    Name: "",
    Returndate: startDate,
    approved: false,
    Date_Added: date,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };
  
  const submitData = async (event) => {
    event.preventDefault();
    const { Reason, Location, Name, approved, Returndate, Date_Added } =
      userData;

    if ( Reason && Location && Name) {
      const res = fetch(
        "https://auth-8771b-default-rtdb.asia-southeast1.firebasedatabase.app/outpass-details.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Reason,
            Location,
            approved,
            Name,
            Returndate,
            Date_Added,
          }),
        }
      );

      if (res) {
        setUserData({
          Reason: "",
          Location: "",
          Name: "",
          Returndate:"",
        });
        setMessage("Complaint Submitted Successfully");
        handler();
      } else {
        setError("Please fill the data");
      }
    } else {
      setError("Please fill the data");
    }
  };

  document.title = "Outpass Form";

  return (
    <>
      <Card>
        <section className="contactus-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-10 mx-auto">
                <div className="row">
                  <div className="contact-leftside col-12 col-lg-5">
                    <figure>
                      <img
                        src="./images/hero1.jpg"
                        alt="contatUsImg"
                        className="img-fluid"
                      />
                    </figure>
                  </div>

                  {/* right side contact form  */}
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}</Alert>}
                  <div className="contact-rightside col-12 col-lg-7">
                    <form method="POST">
                      <div className="row">
                        <div className="col-12 col-lg-6 contact-input-feild">
                          <input
                            type="text"
                            name="Name"
                            id=""
                            className="form-control"
                            placeholder="Name"
                            value={userData.Name}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-lg-6 contact-input-feild">
                          <input
                            type="text"
                            name="Location"
                            id=""
                            className="form-control"
                            placeholder="Room No"
                            value={userData.Location}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-12 ">
                          <input
                            type="text"
                            name="Reason"
                            id=""
                            className="form-control"
                            placeholder="Reason"
                            value={userData.Reason}
                            onChange={postUserData}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 ">
                          
                            
                            <DatePicker 
                              selected={startDate} 
                              onChange={date => setStartDate(date)} 
                            />
                          
                        </div>
                      </div>

                      
                    

                      <button
                        type="submit"
                        className="btn btn-style w-100"
                        onClick={submitData}
                      >
                        Submit
                      </button>
                      <div className="w-100 text-center mt-3">
                        <Link to="/complaint-list">Complaint List</Link>
                      </div>
                      <div className="w-100 text-center mt-1 mb-3">
                        <Link to="/">Dashboard</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
};
