import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNode } from "../../serverApi/rest/nodeApi";
import "./list.scss";

export function DatasetList({ dataset }) {
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(true);
  const updateSelected = async (username) => {
    setLoading(true);
    try {
      const response = await getNode(username);
      setPerson(response.node);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPerson(null);
    }
    setLoading(false);
  };

  function handleClick(username) {
    updateSelected(username);
  }

  useEffect(() => {
    updateSelected(dataset[0]);
  }, []);

  return (
    <>
      <div className="list-source">
        <div className="list-container">
          <div className="left">
            <h2>Source List</h2>
            <div className="contacts-container">
              {dataset.map((username) => {
                const imageStyles = {
                  backgroundImage: `url(https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png)`,
                };
                const contactStyles = {
                  backgroundColor:
                    person && username === person.screenName ? "#70d8bd" : "",
                };
                return (
                  <div
                    className="contact"
                    onClick={() => handleClick(username)}
                    style={contactStyles}
                    key={username}
                  >
                    <span className="image" style={imageStyles}></span>
                    <span className="name">{username}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right">
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
            ) : person ? (
              <ContactInfo person={person} />
            ) : (
              <div className="contact-info">
                <header>
                  <h3 className="name">User not found</h3>
                </header>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function ContactInfo(props) {
  const {
    name,
    screenName,
    location,
    email,
    twitterId,
    description,
    registrationDateTwitter,
    followersCount,
    friendsCount,
    statusesCount,
  } = props.person;

  return (
    <div className="contact-info">
      <header>
        <h3 className="name">{name}</h3>
      </header>
      <section>
        <div className="screenName">
          <span>Screen Name:</span> {screenName}
        </div>
        <div className="email">
          <span>Email:</span> {email}
        </div>
        <div className="address">
          <span>Location:</span> {location}
        </div>
        <div className="twitterId">
          <span>Twitter Id:</span> {twitterId}
        </div>
        <div className="description">
          <span>Description:</span> {description}
        </div>
        <div className="Registration">
          <span>Twitter Registration Date :</span>{" "}
          {new Date(registrationDateTwitter).toLocaleDateString() == "1.1.1"
            ? "Not Available"
            : new Date(registrationDateTwitter).toLocaleDateString()}
        </div>
        <div className="followersCount">
          <span>Followers:</span> {followersCount}
        </div>
        <div className="friendsCount">
          <span>Friends:</span> {friendsCount}
        </div>
        <div className="statusesCount">
          <span>Statuses:</span> {statusesCount}
        </div>
      </section>
    </div>
  );
}

export default ContactInfo;
