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
  ModalSelectHelper,
  onChangeHelper,
  SelectHelper,
  TextInputHelper,
} from "../HelperCells";

const EditOTModal = (props) => {
  const [modal, setModal] = useState(props.showEditModal);
  const [newOperationTeam, setNewOperationTeam] = useState({
    ...props.OperationsTeamDetail,
    _id: props.id,
  });
  const allOperationalRoles = [
    "Customer Operations",
    "Carrier Operations",
    "After Hour Operations",
    "Operations Manager",
  ];
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showEditModal });
  // }
  //Onchange
  const onChange = (e) => {
    onChangeHelper(newOperationTeam, setNewOperationTeam, e);
  };

  console.log(newOperationTeam);
  // Edit Password Function
  const editOperationsTeam = (e) => {
    e.preventDefault();
    let data = newOperationTeam;
    axios
      .post(
        "http://localhost:5000/api/operations-team/edit-operations-team",
        data
      )
      .then((res) => {
        if (res.status == 200) {
          toast.success("Operations Team updated Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.allOperationsTeamList();
        } else {
          toast.error("Operations Team updated Unsuccessful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        catchError(err);
      });
  };
  // Modal box Cancel function
  const handleEditCancel = () => {
    props.handleEditCancel();
  };
  // delete function
  const deleteOperationsTeam = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    setModal(false);
    let data = {
      id,
    };
    axios
      .post("http://localhost:5000/api/operations-team/delete", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Operations Team deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.allOperationsTeamList();
        } else {
          toast.error("Operations Team not deleted!", {
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
          <ModalCloseHelper clickFunc={handleEditCancel} />
          <span className="titleAdd">Role</span>
          <ModalSelectHelper
            name={"role"}
            onChangeFunc={onChange}
            placeholderTxt={"Role"}
            defaultValueField={newOperationTeam.role}
            options={allOperationalRoles.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          />
          <br />
          <span className="titleAdd">Customer Rep</span>
          {props.customerRep.role == 1 && (
            <SelectHelper
              name={"customerRep"}
              onChangeFunc={onChange}
              placeholderTxt={newOperationTeam.customerRep}
              options={
                props.allCustomerReps &&
                props.allCustomerReps.map((customerRep, i) => (
                  <option value={customerRep.name} key={i}>
                    {customerRep.name}
                  </option>
                ))
              }
            />
          )}
          <span className="titleAdd">Name</span>
          <TextInputHelper
            style={{
              marginTop: "20px",
            }}
            placeholderTxt={"Name"}
            name={"name"}
            onChangeFunc={onChange}
            defaultValueField={newOperationTeam.name}
          />
          <span className="titleAdd">Phone Number</span>
          <TextInputHelper
            placeholderTxt={"Phone Number"}
            name={"phone"}
            onChangeFunc={onChange}
            defaultValueField={newOperationTeam.phone}
          />
          <span className="titleAdd">Email</span>
          <TextInputHelper
            placeholderTxt={"Email"}
            name={"email"}
            type={"email"}
            onChangeFunc={onChange}
            defaultValueField={newOperationTeam.email}
          />
          <span className="titleAdd">Password</span>
          <TextInputHelper
            placeholderTxt={"Select a Password"}
            name={"password"}
            type={"password"}
            onChangeFunc={onChange}
          />
          <br />
        </Modal.Body>
        <FooterHelper
          // deleteRecord={(e) => deleteOperationsTeam(e, newOperationTeam._id)}
          editRecord={editOperationsTeam}
        />
      </form>
    </Modal>
  );
};

export default EditOTModal;
