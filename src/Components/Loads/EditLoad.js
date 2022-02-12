import React, { Component, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiOutlineArrowDown } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GrLinkNext } from "react-icons/gr";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import {
  catchError,
  FooterHelper,
  ModalCloseHelper,
  ModalSelectHelper,
  MultiSelectorHelper,
  onChangeHelper,
  statesUSA,
  TextAreaHelper,
  TextInputHelper,
} from "../HelperCells";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    color: "#212529",
    // marginLeft: "auto",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    paddingRight: "0px",
    display: "block",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    margin: "auto",
    appearance: "none",
    border: "1px solid lightgrey",
    padding: "4px 5px",
  },
}));

const EditLoad = (props) => {
  const classes = useStyles();
  const [modal, setModal] = useState(props.showEditModal);
  const [loadDetail, setLoadDetail] = useState({ ...props.LoadDetail });
  const [id, setId] = useState(props.id);
  const [index, setIndex] = useState(0);
  const [allCustomers, setAllCustomers] = useState(props.allCustomers);
  const [allCustomerReps, setAllCustomerReps] = useState(props.allCustomerReps);
  const [accessorials, setAccessorials] = useState([]);
  const user = useSelector((state) => state.Login);
  const allStatus = [
    "Arrived at Shipper",
    "Loaded and Moving",
    "Arrived at Receiver",
    "Unloaded at Receiver",
    "Cancelled",
    "Deliver",
  ];
  const allAccessorials = [
    "Lumper by Carrier",
    "Lumper by Broker",
    "Layover",
    "Detention",
    "TONU",
  ];
  //  componentWillReceiveProps(nextProps) {
  //     setState({ modal: nextProps.showEditModal });
  //   }
  console.log("loadDetail", loadDetail);
  const onChange = (e) => {
    onChangeHelper(loadDetail, setLoadDetail, e);
  };
  const multiSelectChange = (event) => {
    event.persist();
    onChangeHelper(loadDetail, setLoadDetail, event);
  };
  const pickDateChange = (date) => {
    console.log("date", date);
    setLoadDetail({ loadDetail, pickDate: date });
  };
  const dropDateChange = (date) => {
    console.log("date", date);
    setLoadDetail({ loadDetail, dropDate: date });
  };
  const onChangePickTime = (time) => {
    console.log("time", time);
    setLoadDetail({ loadDetail, pickTime: time });
  };
  const onChangeDropTime = (time) => {
    console.log("time", time);
    setLoadDetail({ loadDetail, dropTime: time });
  };
  // Edit Function
  const editLoad = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/load/edit-load", {
        ...loadDetail,
        margin:
          ((loadDetail.customerAmount - loadDetail.carrierAmount) /
            loadDetail.customerAmount) *
          100,
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Load Details Updated Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.loads();
        } else {
          toast.error("Load Details Update Unsuccessful!", {
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
  const deleteLoad = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    setModal(false);
    let data = {
      id,
    };
    axios
      .post("http://localhost:5000/api/load/remove-load", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Load deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.loads();
        } else {
          toast.error("Load not deleted!", {
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
    props.handleEditCancel();
  };

  return (
    <Modal show={modal} className="editLoad" onHide={handleEditCancel}>
      <form encType="multipart/form-data">
        <Modal.Body>
          <ModalCloseHelper clickFunc={() => handleCancel()} />
          <div style={{ display: "flex" }}>
            {/* column 1 */}
            <div className="editLoadColumns" style={{ width: "34%" }}>
              <div className="elementContainer10">
                <span style={{ marginLeft: "5%" }}>Status:</span>
                <ModalSelectHelper
                  disabled={user.role == "After Hour Operations" ? true : false}
                  editLoad={true}
                  // disabled={true}
                  name={"status"}
                  onChangeFunc={onChange}
                  defaultValueField={loadDetail ? loadDetail.status : "Status"}
                  placeholderTxt={"Status"}
                  options={allStatus.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                />
              </div>
              <div className="elementContainer10">
                <span style={{ marginLeft: "5%" }}>Accessorials:</span>
                <TextField
                  // className="inputText"
                  classes={{ root: classes.root }}
                  select
                  disableUnderline
                  name="accessorials"
                  id="accessorials"
                  placeholder="Accessorials"
                  disabled={user.role == "After Hour Operations" ? true : false}
                  SelectProps={{
                    multiple: true,
                    fullWidth: true,
                    required: true,
                    maxRows: 2,
                    value: loadDetail.accessorials
                      ? loadDetail.accessorials
                      : [],
                    onChange: (e) => multiSelectChange(e),
                  }}
                >
                  {allAccessorials.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            {/* column 2 */}
            <div className="editLoadColumns" style={{ width: "32%" }}>
              <div className="elementContainer5">
                <span style={{ marginLeft: "5%" }}>Customer Rep:</span>
                <ModalSelectHelper
                  disabled={user.role == "After Hour Operations" ? true : false}
                  editLoad={true}
                  name={"customerRep"}
                  onChangeFunc={onChange}
                  placeholderTxt={"Customer Reps"}
                  defaultValueField={
                    loadDetail.customerRep ? loadDetail.customerRep : ""
                  }
                  options={allCustomerReps.map((customerRep) => (
                    <option value={customerRep.name}>{customerRep.name}</option>
                  ))}
                />
              </div>
              <div className="elementContainer5">
                <span style={{ marginLeft: "5%" }}>Customer:</span>
                <ModalSelectHelper
                  disabled={user.role == "After Hour Operations" ? true : false}
                  editLoad={true}
                  name={"customerName"}
                  onChangeFunc={onChange}
                  placeholderTxt={loadDetail.customerName}
                  defaultValueField={loadDetail.customerName}
                  options={allCustomers.map((customer) => (
                    <option value={customer.customerFullName}>
                      {customer.customerFullName}
                    </option>
                  ))}
                />
              </div>
            </div>
            {/* column 3 */}
            <div className="editLoadColumns" style={{ width: "34%" }}>
              <div className="elementContainer10">
                <span style={{ marginLeft: "5%" }}>Carrier:</span>
                <ModalSelectHelper
                  disabled={user.role == "After Hour Operations" ? true : false}
                  editLoad={true}
                  name={"carrier"}
                  onChangeFunc={onChange}
                  placeholderTxt={"Not Worked yet"}
                  //   defaultValueField={loadDetail.customerRep}
                  options={allCustomerReps.map((carrier) => (
                    <option value={carrier.name}>{carrier.name}</option>
                  ))}
                />
              </div>
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* column 1 */}
            <div className="editLoadColumns" style={{ width: "30%" }}>
              <div className="pickupDetails">
                <h6>Pickup</h6>
                <div>
                  <p style={{ marginBottom: "0.5rem" }}>
                    {loadDetail.pickShipperName}
                    <br />
                    {loadDetail.pickAddress}
                    <br />
                    {loadDetail.pickCity}, {loadDetail.pickState.split(",")[0]},{" "}
                    {loadDetail.pickZip}
                  </p>
                </div>
              </div>
            </div>
            {/* column 2 */}
            <div
              className="editLoadColumns"
              style={{
                width: "30%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  verticalAlign: "center",
                  margin: "auto",
                }}
              >
                <p style={{ marginBottom: "5px" }}>
                  <b>Load Number: </b>
                  {loadDetail.loadID}
                  <br />
                  <b> Customer Rate: </b>
                  {loadDetail.customerAmount}
                  <br />
                  <b>Carrier Rate: </b>
                  {loadDetail.carrierAmount}
                  <br />
                  <b>Margin: </b>
                  {((loadDetail.customerAmount - loadDetail.carrierAmount) /
                    loadDetail.customerAmount) *
                    100}
                </p>
              </div>
            </div>
            {/* column 3 */}
            <div className="editLoadColumns" style={{ width: "30%" }}>
              <div className="dropDetails">
                <div>
                  <h6>Drop</h6>
                  <p style={{ marginBottom: "0.5rem" }}>
                    {loadDetail.dropReceiverName}
                    <br />
                    {loadDetail.dropAddress}
                    <br />
                    {loadDetail.dropCity}, {loadDetail.dropState.split(",")[0]},{" "}
                    {loadDetail.dropZip}
                  </p>
                </div>
              </div>
            </div>
            {/* New test OVER */}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="editLoadColumns"
              style={{ width: "30%", textAlign: "center" }}
            >
              <h6>Pickup Time</h6>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Aug, 2 08:00</p>
                <p style={{ marginLeft: "30px" }}>Time</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <small>In Time:</small>
                  <p> ???</p>
                </div>
                <div>
                  <small>Out Time: </small>
                  <p style={{ marginLeft: "20px" }}>???</p>
                </div>
              </div>
            </div>
            <div
              className="editLoadColumns"
              style={{ width: "30%", textAlign: "center" }}
            >
              <div
                style={{
                  margin: "10px",
                }}
              >
                <GrLinkNext
                  // onClick={grLinkNext}
                  className="loadModalDirectionButton"
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
              </div>
            </div>
            <div
              className="editLoadColumns"
              style={{ width: "30%", textAlign: "center" }}
            >
              <h6>Drop Time</h6>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Aug, 2 08:00</p>
                <p style={{ marginLeft: "20px" }}>Time</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <small>In Time:</small>
                  <p> ???</p>
                </div>
                <div>
                  <small>Out Time: </small>
                  <p style={{ marginLeft: "20px" }}>???</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {/* column 1 */}
            <div className="editLoadColumns" style={{ width: "34%" }}>
              <div className="pickupDetails">
                <p>
                  <b> PO#: </b>
                  {loadDetail.pickPONumber}
                  <br />
                  <b> Reference#:</b> {loadDetail.pickReferenceId}
                  <br />
                  <b> Pickup#:</b> To Be Decided
                </p>
              </div>
            </div>
            {/* column 2 */}
            <div
              className="editLoadColumns"
              style={{ width: "32%", verticalAlign: "center" }}
            >
              <p
                style={{
                  width: "60%",
                  margin: "auto",
                }}
              >
                <b>Commodity: </b>
                {loadDetail.pickCommodity}
                <br />
                <b>Weight: </b>
                {loadDetail.pickWeight} lbs
              </p>
            </div>
            {/* column 3 */}
            <div className="editLoadColumns" style={{ width: "34%" }}>
              <div className="dropDetails">
                <p>
                  <b>PO#: </b>
                  {loadDetail.dropPONumber}
                  <br />
                  <b>Reference#:</b> {loadDetail.dropReferenceId}
                  <br />
                  <b>Pickup#: </b>To Be Decided
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <FooterHelper
          buttonText="Create Rate Confirmation"
          //   deleteRecord={(e) => deleteLoad(e, id)}
          // editRecord={(e) => editLoad(e)}
        />
        <div
          style={{
            marginBottom: "20px",
            marginTop: "-10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              paddingLeft: "20px",
              cursor: "pointer",
              position: "absolute",
            }}
            onClick={editLoad}
          >
            <IconContext.Provider
              value={{
                color: "#0098DB",
                size: "30px",
              }}
            >
              <div>
                <FiEdit />
              </div>
            </IconContext.Provider>
          </span>
          <span
            style={{
              margin: "auto",
            }}
          >
            Dowload Rate Confirmation <AiOutlineArrowDown />
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default EditLoad;
