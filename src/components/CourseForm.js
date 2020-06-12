import React from "react";
import TextInput from "./common/TextInput";

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

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            type="text"
            name="authorId"
            value={props.course.authorId | ""}
            className="form-control"
            onChange={props.onChange}
          >
            <option value="" />
            <option value="1">Test Author1 </option>
            <option value="2">Test Author2 </option>
          </select>
        </div>
      </div>

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

export default CourseForm;
