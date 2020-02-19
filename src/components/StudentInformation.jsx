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
          <>
            <header>
              <h2>{student.name}</h2>
            </header>
            <section>
              <p>{student.currentBlock}</p>
              <p>{student.startingCohort}</p>
            </section>
          </>
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
        `https://nc-student-tracker.herokuapp.com/api/students/${this.props.student_id}`
      )
      .then(({ data: { student } }) => {
        const currentBlock = student.blockHistory.slice(-1)[0].name;
        student.currentBlock = currentBlock;
        this.setState({ student, isLoading: false });
      });
  };
}

export default StudentInformation;
