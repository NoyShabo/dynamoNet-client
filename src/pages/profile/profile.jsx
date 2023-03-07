import { ProfileCard } from "../../cmp/profileCard/profileCard";
import "./profile.scss";

export function Profile() {

    return (
        <>
        <div className="title-project title-header">My Profile</div>
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
