import React, { Component } from "react";
import StudentBlockReviewCard from "./StudentBlockReviewCard";
import axios from "axios";

class BlockReview extends Component {
  state = {
    students: [],
    block: "fun",
    blockUnderReview: false
  };

  handleChange = event => {
    this.setState({ block: event.target.value });
  };

  filterByBlock = block => {
    const queries = { params: {} };
    if (block !== undefined) {
      queries.params.block = block;
    }
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students", queries)
      .then(({ data: { students } }) => {
        const totalCount = students.length;
        this.setState({ students, totalCount });
      });
  };
  componentDidMount = () => {
    this.filterByBlock(this.state.block);
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log("block review updating");
    if (prevState.block !== this.state.block) {
      this.filterByBlock(this.state.block);
    } else if (prevState.blockUnderReview !== this.state.blockUnderReview) {
      this.filterByBlock(this.state.block);
    } else if (this.state.blockUnderReview === true) {
      this.setState({ blockUnderReview: false });
    }
  };
  setStudentReview = (status, student_id) => {
    this.setState(currentState => {
      const reviewedStudents = currentState.students.map(student => {
        const freshStudent = { ...student };
        if (freshStudent._id === student_id) {
          freshStudent.blockStatus = status;
        }
        return freshStudent;
      });
      return { students: reviewedStudents };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { students, block } = this.state;
    const allStudentsReviewed = students.every(student => {
      return student.blockStatus;
    });
    if (allStudentsReviewed) {
      const studentPromises = students.map(student => {
        return this.patchStudent(student._id, student.blockStatus);
      });
      return Promise.all(studentPromises).then(patchedStudents => {
        return this.setState(() => {
          return {
            blockUnderReview: true
          };
        });
      });
      // .then(() => {
      //   return this.filterByBlock(block);
      // })
      // .then(() => {
      //   return this.setState({ blockUnderReview: false });
      // });
    }
  };

  patchStudent = (student_id, progress) => {
    return axios
      .patch(
        `https://nc-student-tracker.herokuapp.com/api/students/${student_id}?progress=${progress}`
      )
      .then(studentData => {
        return studentData.data.student;
      });
  };

  render() {
    const { students, block, blockUnderReview } = this.state;
    const { handleChange, setStudentReview, handleSubmit } = this;
    return (
      <div>
        <header>
          <h2>Block Review</h2>
        </header>
        <form>
          <label>
            select a block to review:
            <select onChange={handleChange} value={block}>
              <option value="fun">Fundamentals</option>
              <option value="be">Back end</option>
              <option value="fe">Front end</option>
              <option value="proj">Project</option>
            </select>
          </label>
        </form>
        <form onSubmit={handleSubmit}>
          <button>Graduate all relevant students</button>
        </form>
        <ul>
          {students.map(student => {
            return (
              <StudentBlockReviewCard
                student={student}
                key={student._id}
                block={block}
                setStudentReview={setStudentReview}
                blockUnderReview={blockUnderReview}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BlockReview;
