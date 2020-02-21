import React from "react";
import axios from "axios";

class StudentBlockReviewCard extends React.Component {
  state = {
    blockCount: 0,
    buttonState: null
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

  handleChange = (status, student_id) => {
    this.setState({ buttonState: status });
    this.props.setStudentReview(status, student_id);
  };

  render() {
    const { student } = this.props;
    const { blockCount, buttonState } = this.state;
    const { handleChange } = this;
    return (
      <div>
        <h3>{student.name}</h3>
        <h4>block count: {blockCount}</h4>
        <form>
          <label>
            Resit
            <input
              type="radio"
              id="false"
              checked={buttonState === "false"}
              name="reviewStatus"
              onChange={event => {
                handleChange(event.target.id, student._id);
              }}
            ></input>
          </label>
          <label>
            Pass
            <input
              type="radio"
              id="true"
              checked={buttonState === "true"}
              name="reviewStatus"
              onChange={event => {
                handleChange(event.target.id, student._id);
              }}
            ></input>
          </label>
        </form>
      </div>
    );
  }
}

export default StudentBlockReviewCard;
