import React, { Component } from "react";
import StudentPreview from "./StudentPreview";
import axios from "axios";
import BlockFilterForm from "./BlockFilterForm";
import AddStudentForm from "./AddStudentForm";
import { navigate } from "@reach/router";

class Students extends Component {
  state = {
    students: [],
    totalCount: 0
  };

  render() {
    const { students, totalCount } = this.state;
    const { fetchStudents, postStudent } = this;
    return (
      <div>
        <header>Students</header>
        <AddStudentForm postStudent={postStudent} />
        <BlockFilterForm fetchStudents={fetchStudents} />
        <aside>Total count:{totalCount}</aside>
        <ul>
          {" "}
          {students.map(student => {
            return <StudentPreview student={student} key={student._id} />;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = block => {
    const queries = { params: {} };
    if (block === "true" || block === "false") {
      queries.params.graduated = block;
    } else if (block !== undefined) {
      queries.params.block = block;
    }
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students", queries)
      .then(({ data: { students } }) => {
        const totalCount = students.length;
        this.setState({ students, totalCount });
      });
  };

  postStudent = student => {
    return axios
      .post("https://nc-student-tracker.herokuapp.com/api/students", student)
      .then(({ data: { student } }) => {
        navigate(`/students/${student._id}`);
      });
  };

  deleteStudent = student_id => {
    console.log(student_id);
  };
}

export default Students;
