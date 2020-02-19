import React, { Component } from "react";
import StudentPreview from "./StudentPreview";
import axios from "axios";

class Students extends Component {
  state = {
    students: []
  };

  render() {
    const { students } = this.state;
    console.log(students);
    return (
      <div>
        <header>Students</header>
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
        console.log(students);
        this.setState({ students });
      });
  };
}

export default Students;
