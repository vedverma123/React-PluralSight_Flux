import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        className="form-control"
        value={props.course.title}
        onChange={props.onChange}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        className="form-control"
        value={props.course.authorId | ""}
        onChange={props.onChange}
        error={props.errors.authorId}
        options={props.authors}
      ></SelectInput>

      <TextInput
        id="category"
        name="category"
        label="Category"
        className="form-control"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
}

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

export default CourseForm;
