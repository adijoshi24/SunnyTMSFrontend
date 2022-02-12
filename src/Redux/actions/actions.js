const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const signinSuccess = (user) => ({
  type: SIGNIN_SUCCESS,
  user,
});

const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const signinFailure = (user) => ({
  type: SIGNIN_FAILURE,
  user,
});

const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
});
