import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import firebase from "firebase";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./Dashboard.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintsSolvedToday, setComplaintsSolvedToday] = useState(0);
  const [complaintsAddedToday, setComplaintsAddedToday] = useState(0);
  const [pendingOutpasses, setPendingOutpasses] = useState(0);

  useEffect(() => {
    const fetchoutpasses = async () => {
      firebase
        .database()
        .ref("outpass-details")
        .on("value", (snapshot) => {
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            if (temp.approved == false) {
              setPendingOutpasses(pendingOutpasses+1);
            }
          });
          setLoading(false);
        });
    };
    fetchoutpasses();
    return () => firebase.database().ref("outpass-details").off("value");
  }, []);

  const showDate = new Date();
  const date =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear();

  useEffect(() => {
    const fetchComplaints = async () => {
      firebase
        .database()
        .ref("complaint-details")
        .on("value", (snapshot) => {
          let newComplaints = [];
          let temp3 = 0;
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            if (temp.solved == false) {
              newComplaints.push(temp);
            }
            if(temp.Date_Solved == date)
            {
              setComplaintsSolvedToday(complaintsSolvedToday+1);
            }
            if(temp.Date_Added == date)
            {
              setComplaintsAddedToday(complaintsAddedToday+1);
            }
          });
          setLoading(false);
          setComplaints(newComplaints);
        });
    };
    fetchComplaints();
    return () => firebase.database().ref("complaint-details").off("value");
  }, []);
  console.log(complaintsSolvedToday);
  console.log(complaints.length);
  console.log(complaintsAddedToday);
  console.log(pendingOutpasses);

  useEffect(() => {
    const fetchPosts = async () => {
      firebase
        .database()
        .ref("news-and-events")
        .on("value", (snapshot) => {
          let newSlides = [];
          setSlides([]);
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            newSlides.push(temp);
          });
          setLoading(false);
          setSlides(newSlides);
        });
    };
    fetchPosts();
    return () => firebase.database().ref("news-and-events").off("value");
  }, []);

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  document.title = "Dashboard";

  return (
    <React.Fragment>
      <main class="dashboard-container">
        <section class="stats-container">
          <div class="complaint-stats">
            <div>
              Filed Today
              <br></br>
              {complaintsAddedToday}
            </div>
            <div>
              Total Unsolved
              <br></br>
              {complaints.length}
            </div>
          </div>
          <div class="outpass-stats">
            <div>
              Solved Today
              <br></br>
              {complaintsSolvedToday}
            </div>
            <div>
              Pending Outpass
              <br></br>
              {pendingOutpasses}
            </div>
          </div>
        </section>
        <section class="news-container">
          <marquee
            behavior="scroll"
            direction="up"
            scrollamount="3"
            height="250px"
          >
            <ul>
            {slides.map((slide) => {
              return <li>{slide.Label}</li>;
            })}
            </ul>
          </marquee>
        </section>
      </main>
      {/* {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
            id="carousel-slider"
          >
            {index === current && (
              <>
                <img src={slide.Link} alt="travel image" className="image" />
                <IoIosArrowBack className="left-arrow" onClick={prevSlide} />
                <IoIosArrowForward
                  className="right-arrow"
                  onClick={nextSlide}
                />
              </>
            )}
          </div>
        );
      })} */}
    </React.Fragment>
  );
}

// <Card className="slider">
{
  /* <script>
        $("#carousel-slider").slick({
          arrows: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1500,
          mobileFirst: true
        });
        </script> */
}
{
}
