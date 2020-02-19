import React, { Component } from "react";
import axios from "axios";

class StudentInformation extends Component {
  state = {
    student: null,
    isLoading: true
  };
  render() {
    const { student, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {" "}
            <header>
              <h2>{student.name}</h2>
            </header>
            <section>
              <p>{student.currentBlock}</p>
              <p>{student.startingCohort}</p>
            </section>{" "}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchStudent();
  }

  fetchStudent = () => {
    axios
      .get(
        "https://nc-student-tracker.herokuapp.com/api/students/5e3d8417099f3a00170c109a"
      )
      .then(({ data: student }) => {
        console.log(student);
        this.setState({ student, isLoading: false });
      });
  };
}

export default StudentInformation;
