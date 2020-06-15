import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import * as authorActions from "../actions/authorActions";
import { Redirect } from "react-router-dom";

function ManageCourse(props) {
  const [slug, setSlug] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onChange);

    if (authors.length === 0) authorActions.loadAuthors();

    const _slug = props.match.params.slug;
    if (courses.length === 0) courseActions.loadCourse();
    else if (_slug) {
      setSlug(_slug);
      let course = courseStore.getCourseBySlug(_slug);
      if (course) setCourse(course);
      else setRedirect(true);
    }

    function removeListeners() {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    }

    return () => removeListeners();
  }, [props.match.params.slug, courses.length, authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  return redirect ? (
    <Redirect to={"/" + slug} />
  ) : (
    <>
      <h2>Manage course</h2>
      <CourseForm
        authors={authors}
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
    if (!course.authorId) _errors.authorId = "Author is required.";
    if (!course.category) _errors.category = "Category is required.";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }
}

export default ManageCourse;
