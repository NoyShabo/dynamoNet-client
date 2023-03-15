import { ProfileCard } from "../../cmp/profileCard/profileCard";
import "./profile.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();

    function backPrevPage(){
        navigate(-1);
    }
    return (
        <>
        <div className="title-project title-header"><span><ArrowBackIcon onClick={backPrevPage}  style={{ borderRadius: '50%', backgroundColor: '#222c45', color: '#fff', padding: '8px' ,fontSize : '50px' , position: "absolute",left: '20px',top:' 105px',cursor:"pointer"}} /></span>My Profile</div>
        <div className="profilePage">
            <div className='profilePage-container'>
                <ProfileCard
                    name="Shani Correira"
                    email="adipeled224@gmail.com"
                    openProjects="12"
                    processingProjects="4"
                    joinDate="21.1.23"
                ></ProfileCard>

            </div>
        </div>
        </>
    );
}
