import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileCard } from "../../cmp/profileCard/profileCard";
import { logout } from "../../serverApi/rest/authApi";
import "./profile.scss";

export function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [inProgressProjectsNumber, setInProgressProjectsNumber] = useState(0);
  const [openProjectsNumber, setOpenProjectsNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/pageNotFound");
    }

    let inProgressCount = 0;
    let openCount = 0;
    user.projectsRefs.forEach((project) => {
      if (project.status === "in progress") {
        inProgressCount += 1;
      } else {
        openCount += 1;
      }
    });

    setInProgressProjectsNumber(inProgressCount);
    setOpenProjectsNumber(openCount);
  }, []);

  function backPrevPage() {
    navigate(-1);
  }

  const handleLogout = async () => {
    try {
      const res = await logout(user);
      console.log(res);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    user && (
      <>
        <div className="title-project title-header">
          <span>
            <ArrowBackIcon
              onClick={backPrevPage}
              style={{
                borderRadius: "50%",
                backgroundColor: "#222c45",
                color: "#fff",
                padding: "8px",
                fontSize: "50px",
                position: "absolute",
                left: "20px",
                top: " 105px",
                cursor: "pointer",
              }}
            />
          </span>
          My Profile
        </div>
        <div className="profilePage">
          <div className="profilePage-container">
            <ProfileCard
              name={user.name}
              email={user.email}
              openProjects={openProjectsNumber}
              processingProjects={inProgressProjectsNumber}
              joinDate={user.registrationDate}
              onLogout={handleLogout}
            ></ProfileCard>
          </div>
        </div>
      </>
    )
  );
}
