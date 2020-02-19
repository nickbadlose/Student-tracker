import React, { Component } from "react";

class BlockFilterForm extends Component {
  state = {
    filterByBlockInput: "false"
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      filterByBlockInput: event.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Filter by block
          <select
            onChange={this.handleChange}
            value={this.state.filterByBlockInput}
          >
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
