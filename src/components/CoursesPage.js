import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import { deleteCourse, loadCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

function CoursePage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onChange);

    if (authorStore.getAuthors().length === 0) loadAuthors();
    else setAuthors(authorStore.getAuthors());

    if (courseStore.getCourses().length === 0) loadCourse();
    else setCourses(courseStore.getCourses());

    function remvoveListeneres() {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    }

    return () => remvoveListeneres();
  }, [courses.length, authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="course">
        Add Course
      </Link>
      <CourseList
        authors={authors}
        courses={courses}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursePage;
