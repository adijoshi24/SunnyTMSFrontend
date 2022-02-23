import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import {
  catchError,
  ModalCloseHelper,
  onChangeHelper,
  TextInputHelper,
} from "../HelperCells";

const AddCustomerRep = (props) => {
  const [modal, setModal] = useState(props.showAddModal);
  const [newCustomerRep, setNewCustomerRep] = useState({
    role: 2,
    customerRep: props.customerRep,
  });

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showAddModal });
  // }
  //Onchange
  const onChange = (e) => {
    onChangeHelper(newCustomerRep, setNewCustomerRep, e);
  };
  // Submit Function
  const addCustomerRep = (e) => {
    e.preventDefault();
    let data = newCustomerRep;

    axios
      .post("http://localhost:5000/api/customer-rep/add", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Customer Rep addition Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleCancel();
          props.customerRepsList();
        } else {
          toast.error("Customer Rep addition Unsuccessful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        catchError(err);
      });
  };
  // Modal box Cancel function
  const handleCancel = () => {
    props.handleCancel();
  };
  return (
    <Modal
      show={modal}
      onHide={handleCancel}
      className="addCustomerRep"
      centered
    >
      <form encType="multipart/form-data">
        <Modal.Body>
          <ModalCloseHelper clickFunc={handleCancel} />
          <TextInputHelper
            placeholderTxt={"Enter your Full Name"}
            name={"name"}
            onChangeFunc={onChange}
            title={"Full Name"}
          />
          <TextInputHelper
            placeholderTxt={"Enter your Phone Number"}
            name={"phone"}
            onChangeFunc={onChange}
            title={"Phone Number"}
          />
          <TextInputHelper
            placeholderTxt={"Enter your Email Id"}
            name={"email"}
            type={"email"}
            onChangeFunc={onChange}
            title={"Email Id"}
          />
          <TextInputHelper
            placeholderTxt={"Select a Password"}
            name={"password"}
            type={"password"}
            onChangeFunc={onChange}
            title={"Password"}
          />
        </Modal.Body>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <center style={{ marginLeft: "auto", marginRight: "auto" }}>
            <button className="addButton" onClick={addCustomerRep}>
              Create
            </button>
          </center>
        </div>
      </form>
    </Modal>
  );
};

export default AddCustomerRep;
