import AuthContext from '@/contexts/AuthContext';
import { useLogout } from '@/hooks/user/useLogout';
import { HOME_URL } from '@/router/router.const';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout: logoutAuth } = useContext(AuthContext);

  const onSuccess = () => {
    logoutAuth();
    navigate(HOME_URL);
  };
  const onError = (error?: Error) =>
    Swal.fire({ icon: 'error', title: 'Error', text: error?.message });

  const { mutate: logout } = useLogout(onSuccess, onError);

  return (
    <Tooltip title="Logout">
      <IconButton color="inherit" onClick={() => logout()}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
