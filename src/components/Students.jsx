import React, { Component } from "react";
import StudentPreview from "./StudentPreview";
import axios from "axios";
import BlockFilterForm from "./BlockFilterForm";

class Students extends Component {
  state = {
    students: []
  };

  render() {
    const { students } = this.state;
    return (
      <div>
        <header>Students</header>
        <BlockFilterForm />
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

  fetchStudents = () => {
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students")
      .then(({ data: { students } }) => {
        this.setState({ students });
      });
  };
}

export default Students;
