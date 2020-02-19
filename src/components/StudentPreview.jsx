import React from "react";
import { Link } from "@reach/router";

function StudentPreview(props) {
  const { student } = props;
  return (
    <li>
      <Link to={`/students/${student._id}`}>
        <p>{student.name}</p>
        <p>{student.startingCohort}</p>
        <p>{student.currentBlock}</p>
      </Link>
    </li>
  );
}

export default StudentPreview;
