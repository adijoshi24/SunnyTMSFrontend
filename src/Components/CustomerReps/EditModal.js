import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  catchError,
  FooterHelper,
  ModalCloseHelper,
  onChangeHelper,
  TextInputHelper,
} from "../HelperCells";

const EditModal = (props) => {
  const [modal, setModal] = useState(props.showEditModal);
  const [customerRep, setCustomerRep] = useState(props.customerRep);

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showEditModal });
  // }
  //Onchange
  const onChange = (e) => {
    onChangeHelper(customerRep, setCustomerRep, e);
  };
  // Edit Password Function
  const editCustomerRep = (e) => {
    e.preventDefault();
    let data = customerRep;

    if (customerRep.password == customerRep.confirmPassword) {
      axios
        .post("http://localhost:5000/api/customer-rep/edit-customer-rep", data)
        .then((res) => {
          if (res.status == 200) {
            toast.success("Customer-rep updated Successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            props.handleEditCancel();
            props.customerReps();
          } else {
            toast.error("Customer-rep updated Unsuccessful!", {
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
  const deleteCustomerRep = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    setModal(false);
    let data = {
      id,
    };
    axios
      .post("http://localhost:5000/api/customer-rep/delete-customer-rep", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Customer-rep Rep deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.customerReps();
        } else {
          toast.error("Customer-rep Rep not deleted!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        catchError(err);
      });
  };

  return (
    <Modal
      show={modal}
      onHide={handleEditCancel}
      className="editCustomerRep"
      centered
    >
      <form encType="multipart/form-data">
        <Modal.Body>
          <ModalCloseHelper clickFunc={handleEditCancel} />
          <TextInputHelper
            placeholderTxt={"Enter your Full Name"}
            name={"name"}
            onChangeFunc={onChange}
            defaultValueField={customerRep && customerRep.name}
          />
          <TextInputHelper
            placeholderTxt={"Enter your Phone Number"}
            name={"phone"}
            onChangeFunc={onChange}
            defaultValueField={customerRep && customerRep.phone}
          />
          <TextInputHelper
            placeholderTxt={"Enter your Email Id"}
            name={"email"}
            type={"email"}
            onChangeFunc={onChange}
            defaultValueField={customerRep && customerRep.email}
          />
          <TextInputHelper
            placeholderTxt={"Select a Password"}
            name={"password"}
            type={"password"}
            onChangeFunc={onChange}
          />
          <TextInputHelper
            placeholderTxt={"Select a Password"}
            name={"confirmPassword"}
            type={"password"}
            onChangeFunc={onChange}
          />
        </Modal.Body>
        <FooterHelper
          // deleteRecord={(e) => deleteCustomerRep(e, customerRep._id)}
          editRecord={editCustomerRep}
        />
      </form>
    </Modal>
  );
};

export default EditModal;
