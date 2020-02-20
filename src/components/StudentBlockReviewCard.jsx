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
    const { setStudentReview, student } = this.props;
    const { blockCount } = this.state;
    return (
      <div>
        <h3>{student.name}</h3>
        <h4>block count: {blockCount}</h4>
        <form
          onChange={event => {
            setStudentReview(event.target.id, student._id);
          }}
        >
          <label>
            Resit
            <input type="radio" id="false" name="reviewStatus"></input>
          </label>
          <label>
            Pass
            <input type="radio" id="true" name="reviewStatus"></input>
          </label>
        </form>
      </div>
    );
  }
}

export default StudentBlockReviewCard;
