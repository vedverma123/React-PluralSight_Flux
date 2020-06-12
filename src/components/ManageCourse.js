import React, { useState } from "react";
import CourseForm from "./CourseForm";
import * as courseAPI from "../api/courseApi";
import { toast } from "react-toastify";

function ManageCourse(props) {
  const [errors, setErrors] = useState({});

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  return (
    <>
      <h2>Manage course</h2>
      <CourseForm
        course={course}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };

    setCourse(updatedCourse);
  }

  function isFormValid() {
    let _errors = {};

    if (!course.title) _errors.title = "Title is required.";
    if (!course.authorId) _errors.authorId = "Author Id is required.";
    if (!course.category) _errors.category = "Category is required.";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    courseAPI.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }
}

export default ManageCourse;
