import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import firebase from "firebase";
import { ProgressBar } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

import "./ComplaintForm.css";

export const Contact = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // const {
  //   value: enteredName,
  //   isValid: enteredNameIsValid,
  //   hasError: nameInputHasError,
  //   valueChangeHandler: nameChangeHandler,
  //   inputBlurHandler: nameBlurHandler,
  // } = useInput((value) => value.length >= 1);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput((value) => value.length >= 1);

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
  } = useInput((value) => value.length >= 1);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value.length >= 1);

  const [currentName, setCurrentName] = useState("");
  let currentEmail = currentUser.email;

  useEffect(() => {
    const fetchPosts = async () => {
      firebase
        .database()
        .ref("student-list")
        .orderByChild("RoomNo")
        .on("value", (snapshot) => {
          setLoading(true);
          snapshot.forEach((snap) => {
            let temp = snap.val().Email;
            if (temp === currentEmail) {
              let temp2 = snap.val().Name;
              setCurrentName(temp2);
            }
          });
          setLoading(false);
        });
    };
    fetchPosts();
    return () => firebase.database().ref("student-list").off("value");
  }, []);

  const inputClass = "complaint-form-input";
  const invalidClass = "invalid";

  // const nameInputClass = nameInputHasError
  //   ? `${inputClass} ${invalidClass}`
  //   : inputClass;

  const titleInputClass = titleInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;
  const descriptionInputClass = descriptionInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;
  const locationInputClass = locationInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    if (file == null) {
      alert("add a file");
    } else {
      const ref = firebase.storage().ref(`/complaint-images/${file.name}`);
      const uploadTask = ref.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },

        (error) => {
          console.log(error);
        },
        () => {
          ref.getDownloadURL().then((img) => {
            setFile(null);
            setUrl(img);
          });
        }
      );
    }
  }

  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredDescriptionIsValid &&
    enteredLocationIsValid
  )
    formIsValid = true;

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

  const [userData, setUserData] = useState({
    solved: false,
    Date_Added: date,
    Link: "",
    Name: "",
  });

  userData.Link = url;
  userData.Name = currentName;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { solved, Date_Added, Link, Name } = userData;

    if (formIsValid) {
      const res = fetch(
        "https://auth-8771b-default-rtdb.asia-southeast1.firebasedatabase.app/complaint-details.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Complaint: enteredTitle,
            Location: enteredLocation,
            Description: enteredDescription,
            Name,
            solved,
            Date_Added,
            Link,
          }),
        }
      );

      if (res) {
        // setMessage();
        handler();
      } else {
        setError("Please fill the data");
      }
    } else {
      setError("Please fill the data");
    }
  };

  document.title = "Complaint Form";

  return (
    <main className="main-complaint-form">
      {/* {error && (
        <div className="complaint-form-error">
          Oops! Wrong credentials, please try again or contact admin.
        </div>
      )} */}
      <section className="complaint-form-title">
        <h1>File complaint</h1>
      </section>
      <section className="complaint-form-section">
        <form className="complaint-form" method="POST">
          <Input
            className={titleInputClass}
            label="Complaint"
            // error={emailInputHasError && <p>Email is not valid</p>}
            value={enteredTitle}
            inputAttributes={{
              id: "complaint-title",
              type: "text",
            }}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          <Input
            className={locationInputClass}
            label="Location"
            // error={emailInputHasError && <p>Email is not valid</p>}
            value={enteredLocation}
            inputAttributes={{
              id: "complaint-location",
              type: "text",
            }}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
          />
          <Input
            className={descriptionInputClass}
            label="Description"
            // error={emailInputHasError && <p>Email is not valid</p>}
            value={enteredDescription}
            inputAttributes={{
              id: "complaint-description",
              type: "text",
            }}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          <div className="complaint-form-upload-div">
            <div className="complaint-form-upload-input">
              <input type="file" onChange={handleChange} />
              <button
                className="complaint-form-upload-btn"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
            <div className="complaint-form-upload-progress">
              <ProgressBar animated variant="success" now={progress} />
            </div>
          </div>

          <button
            type="submit"
            className="complaint-form-submit-btn"
            onClick={submitData}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};
