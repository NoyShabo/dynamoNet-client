import React from "react";
import "./profileCard.scss";

export function ProfileCard({
  name,
  email,
  joinDate,
  processingProjects,
  openProjects,
  onLogout,
}) {
  return (
    <div className="profile-page">
      <div className="card-container">
        <header></header>
        <h1 className="title">{name}</h1>
        <h2 className="normal-text">{email}</h2>
        <h2 className="normal-text">
          Join at: {new Date(joinDate).toLocaleDateString()}
        </h2>

        <div className="social-container">
          <div className="followers">
            <h1 className="bold-text">{processingProjects}</h1>
            <h2 className="smaller-text text-profile">
              Projects in processing
            </h2>
          </div>
          <div className="likes">
            <h1 className="bold-text ">{openProjects}</h1>
            <h2 className="smaller-text text-profile ">Open Projects</h2>
          </div>
        </div>
        <div className="button-container">
          <button onClick={onLogout}>Logout </button>
        </div>
      </div>
    </div>
  );
}
