const initialState = {};
const Login = (state = initialState, action, props) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      console.log("action", action.user.data.user.name);
      return {
        ...state,
        name: action.user.data.user.name,
        email: action.user.data.user.email,
        password: action.user.data.user.password,
        role: action.user.data.user.role,
        phone: action.user.data.user.phone,
        auth: true,
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
      };
    case "LOGOUT":
      return {
        state: initialState,
        auth: false,
      };
    default:
      return state;
  }
};

export default Login;
