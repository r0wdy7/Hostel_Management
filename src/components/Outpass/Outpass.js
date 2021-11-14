import React from "react";
import { Card } from "react-bootstrap";
import "react-image-lightbox/style.css";

export const Outpass = ({ outpasses }) => {
  return (
    <React.Fragment>
      {outpasses.map((outpass) => (
        <div className="outpass-item">
          <div className="outpass-details">
            <h6 className="card-text">
              <strong>Problem: </strong> {outpass.Reason}
            </h6>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
