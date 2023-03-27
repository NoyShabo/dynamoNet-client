import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileCard } from "../../cmp/profileCard/profileCard";
import { removeSelectedUser } from "../../redux/actions/userActions";
import { logout } from "../../serverApi/rest/authApi";
import "./profile.scss";

export function Profile() {
  // const user = useSelector((state) => state.userModule.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/pageNotFound");
    }
  }, []);

  function backPrevPage() {
    navigate(-1);
  }

  const handleLogout = async () => {
    try {
      const res = await logout(user);
      console.log(res);
      localStorage.removeItem("user");
      // dispatch(removeSelectedUser());
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
              openProjects={user.projectsRefs.length}
              processingProjects="4..."
              joinDate={user.registrationDate}
              onLogout={handleLogout}
            ></ProfileCard>
          </div>
        </div>
      </>
    )
  );
}
