import LoginButton from "@/components/Auth/LoginLogoutButton";
import UserGreetText from "@/components/Auth/UserGreetText";
import React from "react";

function Profile() {
  return (
    <div>
      <UserGreetText />
      <LoginButton />
    </div>
  );
}

export default Profile;
