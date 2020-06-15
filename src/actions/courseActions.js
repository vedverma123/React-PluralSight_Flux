import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    let courseCreatedAction = {
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    };
    dispatcher.dispatch(courseCreatedAction);
  });
}

export function loadCourse() {
  return courseApi.getCourses().then((_courses) => {
    let courseLoadAction = {
      actionType: actionTypes.LOAD_COURSE,
      courses: _courses,
    };
    dispatcher.dispatch(courseLoadAction);
  });
}

export function deleteCourse(courseId) {
  return courseApi.deleteCourse(courseId).then(() => {
    toast.success("Course Deleted.");
    let courseDeletedAction = {
      actionType: actionTypes.DELETE_COURSE,
      id: courseId,
    };
    dispatcher.dispatch(courseDeletedAction);
  });
}
