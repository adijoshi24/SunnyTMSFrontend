import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
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

const AddOTModal = (props) => {
  const [modal, setModal] = useState(props.showAddModal);
  const [newOperationTeam, setNewOperationTeam] = useState({
    customerRep: props.customerRep.name,
  });

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ modal: nextProps.showAddModal });
  // }
  //Onchange
  const onChange = (e) => {
    onChangeHelper(newOperationTeam, setNewOperationTeam, e);
  };
  // Submit Function
  const addOperationTeam = (e) => {
    e.preventDefault();
    let data = newOperationTeam;

    axios
      .post("http://localhost:5000/api/operations-team/add", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Operation Team addition Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleCancel();
          props.allOperationsTeamList();
        } else {
          toast.error("Operation Team addition Unsuccessful!", {
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
    <Modal show={modal} onHide={handleCancel} className="addOTModal">
      <form encType="multipart/form-data">
        <Modal.Body>
          <ModalCloseHelper clickFunc={handleCancel} />{" "}
          <span className="titleAdd">Role</span>
          <SelectHelper
            placeholderTxt={"Role"}
            name={"role"}
            onChangeFunc={onChange}
            options={
              <>
                <option value="Customer Operations">Customer Operations</option>
                <option value="Carrier Operations">Carrier Operations</option>
                <option value="After Hour Operations">
                  After Hour Operations
                </option>
                <option value="Operations Manager">Operations Manager</option>
              </>
            }
          />{" "}
          <span className="titleAdd">Name</span>
          <TextInputHelper
            placeholderTxt={"Name"}
            name={"name"}
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
          <span className="titleAdd">Password</span>
          <TextInputHelper
            placeholderTxt={"Select a Password"}
            name={"password"}
            type={"password"}
            onChangeFunc={onChange}
          />
          <br />
          {props.customerRep.role == 1 && (
            <>
              <span className="titleAdd">Customer Rep</span>
              <SelectHelper
                name={"customerRep"}
                onChangeFunc={onChange}
                placeholderTxt={props.customerRep.name}
                options={
                  props.allCustomerReps &&
                  props.allCustomerReps.map((customerRep) => (
                    <option value={customerRep.name}>{customerRep.name}</option>
                  ))
                }
              />
            </>
          )}
          <br />
        </Modal.Body>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <center style={{ marginLeft: "auto", marginRight: "auto" }}>
            <button
              className="addSubmitButton"
              onClick={(e) => addOperationTeam(e)}
            >
              Create
            </button>
          </center>
        </div>
      </form>
    </Modal>
  );
};

export default AddOTModal;
