import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Posts } from "./Posts";
import { PaginationForPosts } from "../PaginationForPosts";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const StudentList = () => {
  const [posts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    // const fetchPosts = async () => {
    //     setLoading(true);
    //     const res = await axios.get('https://api.npoint.io/a1abe061c04b2e562b47');
    //     setPosts(res.data);
    //     setLoading(false);
    // }

    const fetchPosts = async () => {
      firebase
        .database()
        .ref("student-list")
        .orderByChild("RoomNo")
        .on("value", (snapshot) => {
          setLoading(true);
          snapshot.forEach((snap) => {
            posts.push(snap.val());
          });
          setLoading(false);
        });
    };
    fetchPosts();
    return () => firebase.database().ref("student-list").off("value");
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  document.title = "Student List";

  return (
    <Card className="container mt-5">
      <div>
        <h1 className="text-primary mb-3 mt-3 text-center">Student List</h1>
      </div>
      <Posts posts={currentPosts} loading={loading} />
      <PaginationForPosts
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Card>
  );
};
