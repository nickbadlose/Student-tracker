import React, { Component } from "react";
import StudentBlockReviewCard from "./StudentBlockReviewCard";
import axios from "axios";

class BlockReview extends Component {
  state = {
    students: [],
    block: "fun"
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
    if (prevState.block !== this.state.block) {
      this.filterByBlock(this.state.block);
    }
  };
  render() {
    const { students, block } = this.state;
    const { handleChange } = this;
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
        <ul>
          {students.map(student => {
            return (
              <StudentBlockReviewCard
                student={student}
                key={student._id}
                block={block}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BlockReview;
