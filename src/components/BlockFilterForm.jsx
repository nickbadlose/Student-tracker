import React, { Component } from "react";

class BlockFilterForm extends Component {
  state = {
    filterByBlockInput: ""
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      filterByBlockInput: event.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filterByBlockInput !== this.state.filterByBlockInput) {
      this.props.fetchStudents(this.state.filterByBlockInput);
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { filterByBlockInput } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Filter by block
          <select onChange={handleChange} value={filterByBlockInput}>
            <option value="">all Northcoders</option>
            <option value="false">all current students</option>
            <option value="fun">fundamentals</option>
            <option value="be">back end</option>
            <option value="fe">front end</option>
            <option value="proj">project</option>
            <option value="true">graduate</option>
          </select>
        </label>
      </form>
    );
  }
}

export default BlockFilterForm;
