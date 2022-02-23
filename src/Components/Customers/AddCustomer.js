import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  catchError,
  ModalCloseHelper,
  onChangeHelper,
  SelectHelper,
  TextInputHelper,
} from "../HelperCells";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { BsChevronDown } from "react-icons/bs";
import { TextField, makeStyles } from "@material-ui/core";
const usePlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#aaa",
  },
}));

const Placeholder = ({ children }) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};
const AddCustomer = (props) => {
  const [modal, setModal] = useState(props.showAddModal);
  const [newCustomer, setNewCustomer] = useState({
    customerRep: props.customerRep.name,
  });

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showAddModal });
  // }

  //Onchange
  const onChange = (e) => {
    onChangeHelper(newCustomer, setNewCustomer, e);
  };
  // Submit Function
  const addCustomer = (e) => {
    e.preventDefault();
    let data = newCustomer;

    axios
      .post("http://localhost:5000/api/customer/add", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Customer  addition Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleCancel();
          props.allCustomerList();
        } else {
          toast.error("Customer  addition Unsuccessful!", {
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
    <div>
      <Modal show={modal} onHide={handleCancel} className="addCustomerModal">
        <form encType="multipart/form-data">
          <Modal.Body>
            <ModalCloseHelper clickFunc={handleCancel} />
            <TextInputHelper
              placeholderTxt={"Customer Name"}
              name={"customerFullName"}
              onChangeFunc={onChange}
              title={"Customer Name"}
            />
            <TextInputHelper
              placeholderTxt={"Shipping Manager"}
              name={"shippingManager"}
              onChangeFunc={onChange}
              title={"Shipping Manager"}
            />
            <TextInputHelper
              placeholderTxt={"Phone Number"}
              name={"phone"}
              onChangeFunc={onChange}
              title={"Phone Number"}
            />
            <TextInputHelper
              placeholderTxt={"Email"}
              name={"email"}
              type={"email"}
              onChangeFunc={onChange}
              title={"Email"}
            />
            <TextInputHelper
              placeholderTxt={"Account Payable"}
              name={"accountPayable"}
              onChangeFunc={onChange}
              title={"Account Payable"}
            />
            <TextInputHelper
              placeholderTxt={"Account Payable Email"}
              name={"accountPayableEmail"}
              onChangeFunc={onChange}
              title={"Account Payable Email"}
            />
            {props.customerRep.role == 1 && (
              <>
                <span className="titleAdd">Customer Rep</span>
                <SelectHelper
                  name={"customerRep"}
                  onChangeFunc={onChange}
                  placeholderTxt={props.customerRep.name}
                  style={{ margin: "auto", width: "90%" }}
                  options={
                    props.allCustomerReps &&
                    props.allCustomerReps.map((customerRep, i) => (
                      <option value={customerRep.name} key={i}>
                        {customerRep.name}
                      </option>
                    ))
                  }
                />
              </>
            )}
          </Modal.Body>
          <div style={{ display: "flex", marginBottom: "15px" }}>
            <center style={{ marginLeft: "auto", marginRight: "auto" }}>
              <button className="addButton" onClick={addCustomer}>
                Submit
              </button>
            </center>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCustomer;
