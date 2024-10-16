import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      type="primary"
      onClick={() => logout({ returnTo: window.location.origin })}
      style={{ marginRight: '1rem', marginTop:'1rem' }}
    >
      Logout
    </Button>
  );
};


// export default LogoutButton;
