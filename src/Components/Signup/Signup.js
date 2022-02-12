// import React, { Component } from "react";
// import TextField from "@material-ui/core/TextField";
// import axios from "axios";
// import { withRouter } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const dummyImg =
//   "data:image/jpeg;base64,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";
// class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       itemImagePreview: dummyImg,
//     };
//     this.myRef = React.createRef();
//     document.body.style.backgroundColor = "white";
//   }

//   submitSignup = (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("itemImage", this.state.itemImage);
//     formData.append("name", this.state.name);
//     formData.append("email", this.state.email);
//     formData.append("password", this.state.password);
//     formData.append("date", Date.now());

//     axios
//       .post("http://localhost:5000/api/users", formData)
//       .then((res) => {
//         if (res.status == 200) {
//           toast.success("Signup Successful!", {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         } else {
//           toast.error("Signup Unsuccessful!", {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         }
//       })
//       .catch((err) => {
//         var text = "";
//         for (let i = 0; i < err.response.data.errors.length; i++) {
//           text += `• ${err.response.data.errors[i].msg}. \n `;
//         }

//         toast.error(text, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       });
//   };

//   onChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };
//   onImageChange = (e) => {
//     var file = this.refs.uploadImg.files[0];
//     var reader = new FileReader();
//     var url = reader.readAsDataURL(file);
//     this.setState({
//       itemImage: e.target.files[0],
//     });
//     reader.onloadend = () => {
//       this.setState({
//         itemImagePreview: [reader.result],
//       });
//     };
//   };
//   render() {
//     return (
//       <div className="signup">
//         <form>
//           <h2
//             style={{
//               color: "#f5292f",
//               marginBottom: "25px",
//               fontWeight: "bold",
//             }}
//           >
//             SIGNUP
//           </h2>
//           <img src={this.state.itemImagePreview} className="signupImage" />
//           <br />
//           <input
//             type="file"
//             className="loginTextFields"
//             onChange={(e) => this.onImageChange(e)}
//             ref="uploadImg"
//           />
//           <br />
//           <TextField
//             required
//             label="Name"
//             variant="outlined"
//             className="loginTextFields"
//             onChange={(e) => this.onChange(e)}
//             name="name"
//           />
//           <br />
//           <TextField
//             required
//             type="email"
//             label="Email"
//             variant="outlined"
//             className="loginTextFields"
//             onChange={(e) => this.onChange(e)}
//             name="email"
//           />
//           <br />

//           <TextField
//             required
//             label="Password"
//             type="password"
//             autoComplete="current-password"
//             variant="outlined"
//             className="loginTextFields"
//             onChange={(e) => this.onChange(e)}
//             name="password"
//           />
//           <br />
//           <p
//             onClick={(e) => this.submitSignup(e)}
//             type="submit"
//             className="signupButton"
//           >
//             Sign up
//           </p>
//           <p
//             className="loginButton"
//             onClick={() => this.props.history.push("/")}
//           >
//             Already a user? Login
//           </p>
//         </form>
//       </div>
//     );
//   }
// }
// export default withRouter(Signup);
