import React from "react";
import { Card } from "react-bootstrap";
import "react-image-lightbox/style.css";

import "./Complaints.css";

export const Complaints = ({ complaints, loading }) => {
  if (loading) {
    return (
      <Card>
        <h2>Loading</h2>
      </Card>
    );
  }

  return (
    <React.Fragment>
      {complaints.map((complaint) => (
        <div className="complaint-item">
          <div className="complaint-image">
            <img src={complaint.Link} class="card-img" alt="..." />
          </div>
          <div className="complaint-details">
            <h6 className="card-text">
              <strong>Problem: </strong> {complaint.Complaint}
            </h6>
            <h6 className="description">
              <strong>Description: </strong> {complaint.Description}
            </h6>
            <h6 className="date">
              <strong>Location: </strong> {complaint.Location}
            </h6>
            <h6 className="date">
              <strong>Date of Complaint: </strong> {complaint.Date_Added}
            </h6>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
