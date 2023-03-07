import "./notificationPopup.scss";

export function NotificationPopup({
  message,
  showNotification,
  setShowNotification,
}) {
  return (
    showNotification && (
      <div className="notification">
        <p>{`${message}`}</p>
        <button onClick={() => setShowNotification(false)}>Close</button>
      </div>
    )
  );
}