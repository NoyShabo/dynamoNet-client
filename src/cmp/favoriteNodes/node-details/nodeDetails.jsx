import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./nodeDetails.scss";

export function NodeCard({ nodeDetails, loading }) {
  return (
    <div className="nodeCard">
      <div className="wrapper">
        {loading ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <>
            <div className="name title-project">{nodeDetails.name}</div>
            <div className="username">{nodeDetails.screenName}</div>
            <div className="twitterId">Twitter Id: {nodeDetails.twitterId}</div>

            <div className="location-details">
              <i className="fa-sharp fa-solid fa-location-dot"></i>
              <span> {nodeDetails.location}</span>
            </div>
            <div className="about-me">{nodeDetails.description}</div>

            <div className="username">
              Join Twitter At:{" "}
              {new Date(
                nodeDetails.registrationDateTwitter
              ).toLocaleDateString() == "1.1.1"
                ? "Not Available"
                : new Date(
                    nodeDetails.registrationDateTwitter
                  ).toLocaleDateString()}
            </div>
            <div className="stats">
              <div className="item followers">
                <span className="num">
                  {nodeDetails.followersCount == -1
                    ? " not found"
                    : nodeDetails.followersCount}
                </span>
                <div className="text">Followers</div>
              </div>
              <div className="item friends">
                <span className="num">
                  {nodeDetails.friendsCount == -1
                    ? " not found"
                    : nodeDetails.friendsCount}
                </span>
                <div className="text">Friends</div>
              </div>
              <div className="item Statuses">
                <span className="num">
                  {nodeDetails.statusesCount == -1
                    ? " not found"
                    : nodeDetails.statusesCount}
                </span>
                <div className="text">Statuses</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
