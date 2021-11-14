import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Complaints } from "./Complaints";
import { PaginationForPosts } from "../PaginationForPosts";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import "./ComplaintList.css";

export const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(3);

  useEffect(() => {
    const fetchComplaints = async () => {
      firebase
        .database()
        .ref("complaint-details")
        .on("value", (snapshot) => {
          let newComplaints = [];
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            if (temp.solved == false) {
              newComplaints.push(temp);
            }
          });
          setLoading(false);
          setComplaints(newComplaints);
        });
    };
    fetchComplaints();
    return () => firebase.database().ref("complaint-details").off("value");
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  document.title = "Complaint List";

  return (
    <main className="complaint-list-container">
      <section className="complaint-title-section">
        <h1 className="complaint-list-title">Complaint List</h1>
      </section>
      <section className="complaint-list-section">
        <Complaints complaints={currentComplaints} loading={loading} />
      </section>
      <section className="complaint-pagination-section">
        <PaginationForPosts
          postsPerPage={complaintsPerPage}
          totalPosts={complaints.length}
          paginate={paginate}
        />
      </section>
      <Link to="/complaint-form" className="post-complaint-button-section">
        <ImPlus />
      </Link>
    </main>
  );
};
