import React from "react";

function Jobs() {
  return (
    <div className="jobs-page">
      <h1>Việc làm</h1>
      <div className="job-list">
        <div className="job-card">
          <h3>Frontend Developer</h3>
          <p>Công ty ABC</p>
          <p>Hà Nội</p>
        </div>
        <div className="job-card">
          <h3>Backend Developer</h3>
          <p>Công ty XYZ</p>
          <p>Hồ Chí Minh</p>
        </div>
        <div className="job-card">
          <h3>UX/UI Designer</h3>
          <p>Công ty DEF</p>
          <p>Đà Nẵng</p>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
