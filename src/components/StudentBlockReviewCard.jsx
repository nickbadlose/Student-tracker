import React from "react";
import axios from "axios";

class StudentBlockReviewCard extends React.Component {
  state = {
    blockCount: 0
  };

  fetchSpecificStudentDetails = () => {
    axios
      .get(
        `https://nc-student-tracker.herokuapp.com/api/students/${this.props.student._id}`
      )
      .then(({ data: { student } }) => {
        const blockCount = student.blockHistory.reduce((acc, curr) => {
          return curr.slug === this.props.block ? ++acc : acc;
        }, 0);
        this.setState({ blockCount });
      });
  };
  componentDidMount = () => {
    this.fetchSpecificStudentDetails();
  };

  render() {
    return (
      <div>
        <h3>{this.props.student.name}</h3>
        <h4>block count: {this.state.blockCount}</h4>
        <label>
          Resit
          <input type="radio" id="resit" name="reviewStatus"></input>
        </label>
        <label>
          Pass
          <input type="radio" id="pass" name="reviewStatus"></input>
        </label>
      </div>
    );
  }
}

export default StudentBlockReviewCard;
