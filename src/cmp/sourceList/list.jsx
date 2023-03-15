import React, { useEffect, useState } from "react";
import { getNode } from "../../serverApi/rest/nodeApi";
import { NotificationPopup } from "../notification-popup/notificationPopup";
import "./list.scss";

// const contactsArray = [
//   {
//     name: 'Mary Margaret Blanchard',
//     screenName: 'Mary mama Blanchard',
//     location: 'NY 232',
//     email: 'snowwhite@ouatmail.com',
//     twitterId: '113131',
//     description: 'mskdskmsdm ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"23",
//     friendsCount:"23",
//     statusesCount:"55",
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },
//   {
//     name: 'noa  ddd',
//     screenName: 'dd mama Blanchard',
//     location: 'LA 232',
//     email: 'snowwhite@sdsdsd.com',
//     twitterId: 'dssdsdsd',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"23",
//     friendsCount:"33",
//     statusesCount:"55",
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },
//   {
//     name: 'adi  sdds',
//     screenName: 'dd sds Blanchard',
//     location: 'HOD 232',
//     email: 'sddsd@sdsdsd.com',
//     twitterId: '222323',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"33",
//     friendsCount:"44",
//     statusesCount:55,
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },
//   {
//     name: 'adi  sdds',
//     screenName: 'dd sds Blanchard',
//     location: 'HOD 232',
//     email: 'sddsd@sdsdsd.com',
//     twitterId: '222323',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"33",
//     friendsCount:"44",
//     statusesCount:55,
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },  {
//     name: 'adi  sdds',
//     screenName: 'dd sds Blanchard',
//     location: 'HOD 232',
//     email: 'sddsd@sdsdsd.com',
//     twitterId: '222323',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"33",
//     friendsCount:"44",
//     statusesCount:55,
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },  {
//     name: 'adi  sdds',
//     screenName: 'dd sds Blanchard',
//     location: 'HOD 232',
//     email: 'sddsd@sdsdsd.com',
//     twitterId: '222323',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"33",
//     friendsCount:"44",
//     statusesCount:55,
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },  {
//     name: 'adi  sdds',
//     screenName: 'dd sds Blanchard',
//     location: 'HOD 232',
//     email: 'sddsd@sdsdsd.com',
//     twitterId: '222323',
//     description: 'sd ds dds sd sd sd  sd',
//     registrationDateTwitter:"Dfdf",
//     followersCount:"33",
//     friendsCount:"44",
//     statusesCount:55,
//     image: 'http://assets.wornon.tv/uploads/2012/03/s01e05-marys-brown-coat-over-teal-skirt-yellow-flatsb.jpg',
//     isActive: true
//   },
// ];

export function DatasetList({ dataset }) {
  const [person, setPerson] = useState();
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const updateSelected = async (username) => {
    try {
      const response = await getNode(username);
      setPerson(response.node);
    } catch (error) {
      setError(error);
      setShowNotification(true);
      setPerson(null);
    }
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
            {person ? (
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
      <NotificationPopup
        message={error}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
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
          <span>Twitter Registration Date :</span> {registrationDateTwitter}
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
