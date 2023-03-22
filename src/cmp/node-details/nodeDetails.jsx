import React from "react";
import "./nodeDetails.scss";

export function NodeCard({ nodeDetails }) {
  // console.log(nodeDetails.registrationDateTwitter)
  // // console.log(typeof(Date(nodeDetails.registrationDateTwitter).toLocaleDateString()))
  // console.log(nodeDetails.registrationDateTwitter)
  // if(nodeDetails.registrationDateTwitter){
  //   nodeDetails.registrationDateTwitter = new Date(nodeDetails.registrationDateTwitter).toLocaleDateString()
  // }
  return (
    <div className="nodeCard">
      <div className="wrapper">
        <div className="name title-project">{nodeDetails.name}</div>
        <div className="username">{nodeDetails.screenName}</div>
        <div className="twitterId">Twitter Id: {nodeDetails.twitterId}</div>

        <div className="location-details">
          <i className="fa-sharp fa-solid fa-location-dot"></i>
          <span> {nodeDetails.location}</span>
        </div>
        <div className="about-me">{nodeDetails.description}</div>

        <div className="username">
          Join Twitter At: { new Date(nodeDetails.registrationDateTwitter).toLocaleDateString()== '1.1.1' ? 'Not Available' : new Date(nodeDetails.registrationDateTwitter).toLocaleDateString()}
        </div>
        <div className="stats">
          <div className="item followers">
            <span className="num">{nodeDetails.followersCount}</span>
            <div className="text">Followers</div>
          </div>
          <div className="item friends">
            <span className="num">{nodeDetails.friendsCount}</span>
            <div className="text">Friends</div>
          </div>
          <div className="item Statuses">
            <span className="num">{nodeDetails.statusesCount}</span>
            <div className="text">Statuses</div>
          </div>
        </div>
      </div>
    </div>
  );
}
