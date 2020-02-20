import React, { Component } from "react";

class AddStudentForm extends Component {
  state = {
    name: "",
    startingCohort: ""
  };

  handleChange = event => {
    const key = event.target.id;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, startingCohort } = this.state;
    const student = { name, startingCohort };
    if (name.length && startingCohort.length) {
      this.props.postStudent(student);
    }
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { name, startingCohort } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Student name:
          <input type="text" id="name" value={name} onChange={handleChange} />
        </label>
        <label>
          Starting cohort:
          <input
            type="number"
            id="startingCohort"
            value={startingCohort}
            onChange={handleChange}
          />
        </label>
        <button>Add new student</button>
      </form>
    );
  }
}

export default AddStudentForm;
