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
  SelectHelperMUI,
} from "../HelperCells";
import MenuItem from "@material-ui/core/MenuItem";

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
            <span className="titleAdd">Customer Name</span>
            <TextInputHelper
              placeholderTxt={"Customer Name"}
              name={"customerFullName"}
              onChangeFunc={onChange}
            />
            <br />
            <span className="titleAdd">Shipping Manager</span>
            <TextInputHelper
              placeholderTxt={"Shipping Manager"}
              name={"shippingManager"}
              onChangeFunc={onChange}
            />
            <br />
            <span className="titleAdd">Phone Number</span>
            <TextInputHelper
              placeholderTxt={"Phone Number"}
              name={"phone"}
              onChangeFunc={onChange}
            />
            <br />
            <span className="titleAdd">Email</span>
            <TextInputHelper
              placeholderTxt={"Email"}
              name={"email"}
              type={"email"}
              onChangeFunc={onChange}
            />
            <br />
            <span className="titleAdd">Account Payable</span>
            <TextInputHelper
              placeholderTxt={"Account Payable"}
              name={"accountPayable"}
              onChangeFunc={onChange}
            />
            <br />
            <span className="titleAdd">Account Payable Email</span>
            <TextInputHelper
              placeholderTxt={"Account Payable Email"}
              name={"accountPayableEmail"}
              onChangeFunc={onChange}
            />
            <br />
            {props.customerRep.role == 1 && (
              <>
                <span className="titleAdd">Customer Rep</span>
                <SelectHelperMUI
                  name={"customerRep"}
                  onChangeFunc={onChange}
                  placeholderTxt={props.customerRep.name}
                  style={{ margin: "auto", width: "90%" }}
                  options={
                    props.allCustomerReps &&
                    props.allCustomerReps.map((customerRep) => (
                      <MenuItem value={customerRep.name}>
                        {customerRep.name}
                      </MenuItem>
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
