import React from "react";
import { Card, Table } from "react-bootstrap";

export const Posts = ({ posts, loading }) => {
  if (loading) {
    return (
      <Card>
        <h2>Loading..</h2>
      </Card>
    );
  }

  return (
    <Table responsive class="sortable" className="student mb-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No.</th>
          <th>Room No.</th>
        </tr>
      </thead>
      {posts.map((post) => (
        <tbody>
          <tr>
            <td className="student-name">{post.Name}</td>
            <td className="student-roll">{post.RollNo}</td>
            <td className="student-room">{post.RoomNo}</td>
          </tr>
        </tbody>
      ))}
    </Table>
    // <ul className="list-group mb-4">
    //     {posts.map(post => (
    //         <li key={post.id} className="list-group-item">
    //             {post.Name}
    //         </li>
    //     ))}
    // </ul>
  );
};
