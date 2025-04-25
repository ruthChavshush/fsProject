// src/api/authContextHelper.ts
let accessToken: string | undefined = undefined;
let refreshToken: string | undefined = undefined;
let setAccessToken: ((token: string) => void) | undefined = undefined;
let logout: (() => void) | undefined = undefined;

export const setAuthContextValues = (
  newAccessToken: string | undefined,
  newRefreshToken: string | undefined,
  newSetAccessToken: ((token: string) => void) | undefined,
  newLogout: (() => void) | undefined
) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  setAccessToken = newSetAccessToken;
  logout = newLogout;
};

export const getAuthContextValues = () => ({
  accessToken,
  refreshToken,
  setAccessToken,
  logout,
});
