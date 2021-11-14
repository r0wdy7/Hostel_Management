import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { PaginationForPosts } from "../PaginationForPosts";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import "./OutpassList.css"
import { Outpass } from "./Outpass";

export const OutpassList = () => {
  const [outpasses, setoutPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [outpassesPerPage] = useState(6);

  useEffect(() => {
    const fetchoutpasses = async () => {
      firebase
        .database()
        .ref("outpass-details")
        .on("value", (snapshot) => {
          let newoutpasses = [];
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            if (temp.solved == false) {
              newoutpasses.push(temp);
            }
          });
          setLoading(false);
          setoutPasses(newoutpasses);
        });
    };
    fetchoutpasses();
    return () => firebase.database().ref("outpass-details").off("value");
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastOutpass = currentPage * outpassesPerPage;
  const indexOfFirstOutpass = indexOfLastOutpass - outpassesPerPage;
  const currentoutpasses = outpasses.slice(
    indexOfFirstOutpass,
    indexOfLastOutpass
  );

  document.title = "Outpass List";

  return (
    <div class="container">
        <section class="title-section">
            <h1 class="title-content">List of Active Outpasses</h1>
        </section>
        <section class="outpasslist-section">
            <div class="card-container">
                <div class="card-text">
                    {/* <span class="description">Old McDonald had a farm EIEIO</span> */}
                    <Outpass outpasses={outpasses} />
                    <span class="yesno-buttons">
                        <button type="button" class="btn btn-default btn-sm">
                            <span class="glyphicon glyphicon-ok"></span> Approve
                        </button>
                        <button type="button" class="btn btn-default btn-sm">
                            <span class="glyphicon glyphicon-remove"></span> Deny
                        </button>
                    </span>
                </div>
            </div>
        </section>
    <Link to="/outpass-form" className="post-complaint-button-section">
        <ImPlus />
      </Link>
    </div>
  )
}