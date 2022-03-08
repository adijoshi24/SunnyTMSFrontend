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
} from "../HelperCells";
import InputField from "../Atoms/form/InputField";
import { Stack } from "@mui/material";
import CrossIcon from "../Atoms/CrossIcon";

const AddCustomerRep = (props) => {
  const [modal, setModal] = useState(props.showAddModal);
  const [newCustomerRep, setNewCustomerRep] = useState({
    role: "customerRep",
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
          <div onClick={handleCancel}><CrossIcon /></div>
          <Stack sx={{ p: 5 }} spacing={3}>
            <InputField
              label={"Name"}
              name={"name"}
              onChangeFunc={onChange}
              title={"Full Name"}
            />
            <InputField
              label={"Phone Number"}
              name={"phone"}
              onChangeFunc={onChange}
              title={"Phone Number"}
            />
            <InputField
              label={"Email"}
              name={"email"}
              type={"email"}
              onChangeFunc={onChange}
              title={"Email Id"}
            />
            <InputField
              label={"Password"}
              name={"password"}
              type={"password"}
              onChangeFunc={onChange}
              title={"Password"}
            />
          </Stack>
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
