import React from "react";

function ManageCourse(props) {
  return (
    <>
      <h2>Manage course</h2>
      {props.match.params.slug}
    </>
  );
}

export default ManageCourse;
