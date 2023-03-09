import React from "react";
import AuthUser from "../../components/AuthUser/AuthUser";

const UnauthorizedPage = (): JSX.Element => {
  return (
    <div>
      <AuthUser
        message="You did not have access to the page you were trying to access. Please log in to continue"
        messageHeader="Unauthorized"
      />
    </div>
  );
};

export default UnauthorizedPage;
