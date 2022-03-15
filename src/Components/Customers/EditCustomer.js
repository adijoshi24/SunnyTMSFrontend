import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  catchError,
  FooterHelper,
  ModalCloseHelper,
  onChangeHelper,
  SelectHelper,
  TextInputHelper,
} from "../HelperCells";
import CrossIcon from "../Atoms/CrossIcon";

const EditCustomer = (props) => {
  const [modal, setModal] = useState(props.showEditModal);
  const [customer, setCustomer] = useState(props.CustomerDetail);
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showEditModal });
  // }
  //Onchange
  const onChange = (e) => {
    onChangeHelper(customer, setCustomer, e);
  };
  // Edit Password Function
  const editCustomer = (e) => {
    e.preventDefault();
    let data = customer;
    if (customer.password == customer.confirmPassword) {
      axios
        .post("http://localhost:5000/api/customer/edit-customer", data)
        .then((res) => {
          if (res.status == 200) {
            toast.success("Customer updated Successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            props.handleEditCancel();
            props.allCustomerList();
          } else {
            toast.error("Customer updated Unsuccessful!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          catchError(err);
        });
    } else {
      toast.error("Passwords do not match!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // Modal box Cancel function
  const handleEditCancel = () => {
    props.handleEditCancel();
  };
  const deleteCustomer = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    setModal(false);
    let data = {
      id,
    };
    axios
      .post("http://localhost:5000/api/customer/delete-customer", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Customer Rep deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.allCustomerList();
        } else {
          toast.error("Customer Rep not deleted!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        catchError(err);
      });
  };

  return (
    <Modal show={modal} onHide={handleEditCancel}>
      <form encType="multipart/form-data">
        <Modal.Body>
          <div onClick={handleEditCancel}>
            <CrossIcon />
          </div>
          <TextInputHelper
            placeholderTxt={"Customer Name"}
            name={"customerFullName"}
            onChangeFunc={onChange}
            defaultValueField={customer.customerFullName}
            title={"Customer Name"}
          />
          <TextInputHelper
            placeholderTxt={"Shipping Manager"}
            name={"shippingManager"}
            onChangeFunc={onChange}
            defaultValueField={customer.shippingManager}
            title={"Shipping Manager"}
          />
          <TextInputHelper
            placeholderTxt={"Phone Number"}
            name={"phone"}
            onChangeFunc={onChange}
            defaultValueField={customer.phone}
            title={"Phone Number"}
            type={"number"}
          />
          <TextInputHelper
            placeholderTxt={"Email"}
            name={"email"}
            type={"email"}
            onChangeFunc={onChange}
            defaultValueField={customer.email}
            title={"Email"}
          />
          <TextInputHelper
            placeholderTxt={"Account Payable"}
            name={"accountPayable"}
            onChangeFunc={onChange}
            defaultValueField={customer.accountPayable}
            title={"Account Payable"}
          />
          <TextInputHelper
            placeholderTxt={"Account Payable Email"}
            name={"accountPayableEmail"}
            onChangeFunc={onChange}
            defaultValueField={customer.accountPayableEmail}
            title={"Account Payable Email"}
            type={"email"}
          />
          <TextInputHelper
            placeholderTxt={"Account Payable Phone Number"}
            name={"accountPayablePhoneNumber"}
            onChangeFunc={onChange}
            title={"Account Payable Phone Number"}
            defaultValueField={customer.accountPayablePhoneNumber}
            type={"number"}
          />
          {props.customerRep.role == "admin" && (
            <>
              <span className="titleAdd">Customer Rep</span>
              <SelectHelper
                name={"customerRep"}
                onChangeFunc={onChange}
                placeholderTxt={customer.customerRep}
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
        <FooterHelper
          // deleteRecord={(e) => deleteCustomer(e, customer._id)}
          editRecord={(e) => editCustomer(e)}
        />
      </form>
    </Modal>
  );
};

export default EditCustomer;
