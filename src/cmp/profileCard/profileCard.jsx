
import React from "react";
import "./profileCard.scss";

export function ProfileCard(props) {
	return (
		<div className="profile-page">
		<div className="card-container">
			<header>
				{/* <img src={avatar} alt={props.name} /> */}
			</header>
			<h1 className="title">
				{props.name} 
			</h1>
			<h2 className="normal-text">{props.email}</h2>
			<h2 className="normal-text">Join at: {props.joinDate}</h2>

			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">{props.processingProjects}</h1>
					<h2 className="smaller-text text-profile">Projects in processing</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text ">{props.openProjects}</h1>
					<h2 className="smaller-text text-profile ">Open Projects</h2>
				</div>

			</div>
			<div className="button-container">
				<button>Logout </button>
			</div>
		</div>
		</div>
	);
}
