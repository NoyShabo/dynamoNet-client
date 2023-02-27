import { ProfileCard } from "../../cmp/profileCard/profileCard";
import "./profile.scss";

export function Profile() {

    return (
        <div className="profilePage">
            <ProfileCard
                name="Shani Correira"
                email="adipeled224@gmail.com"
                openProjects="12"
                processingProjects="4"
                joinDate="21.1.23"
            ></ProfileCard>  
            </div>
    );
}
