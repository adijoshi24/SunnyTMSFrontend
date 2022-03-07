import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineArrowDown } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import { FaTools } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { MenuItem, TextField } from "@material-ui/core";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import {
  catchError,
  FooterHelper,
  ModalCloseHelper,
  ModalSelectHelper,
  onChangeHelper,
} from "../HelperCells";
import { makeStyles } from "@material-ui/core/styles";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    color: "#212529",
    // marginLeft: "auto",
    backgroundClip: "padding-box",
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
  input: {
    selectColor: "red",
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
    "Arrived at Pickup",
    "Picked Up",
    "Arrived at Delivery",
    "Delivered",
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
  // console.log("loadDetail", loadDetail);
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
  // Duplicate Load Function
  const duplicateLoad = (e) => {
    e.preventDefault();
    const cloneloadDetail = (({ _id, __v, ...o }) => o)(loadDetail); // remove b and c
    let payload = {
      ...cloneloadDetail,
      loadID: Math.round(Math.random() * 10000000),
    };
    axios
      .post("http://localhost:5000/api/load/add-load", payload)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Load Duplicated Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.handleEditCancel();
          props.loads();
        } else {
          toast.error("Load Duplication Unsuccessful!", {
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
  // Delete Load Function
  const deleteLoad = (e, id) => {
    e.preventDefault();
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
                  options={allStatus.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                />
              </div>
              <div className="elementContainer10">
                <span style={{ marginLeft: "5%" }}>Accessorials:</span>
                <TextField
                  // className="inputText"
                  classes={{ root: classes.root }}
                  select
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
                  {allAccessorials.map((item, i) => (
                    <MenuItem value={item} key={i}>
                      {item}
                    </MenuItem>
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
                  options={allCustomerReps.map((customerRep, i) => (
                    <option value={customerRep.name} key={i}>
                      {customerRep.name}
                    </option>
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
                  options={allCustomers.map((customer, i) => (
                    <option value={customer.customerFullName} key={i}>
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
                  disabled={user.role === "After Hour Operations"}
                  editLoad={true}
                  name={"carrier"}
                  onChangeFunc={onChange}
                  placeholderTxt={"Not Worked yet"}
                  //   defaultValueField={loadDetail.customerRep}
                  options={allCustomerReps.map((carrier, i) => (
                    <option value={carrier.name} key={i}>
                      {carrier.name}
                    </option>
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
                {/* <p>Aug, 2 08:00</p> */}
                <DesktopDatePicker
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  value={loadDetail.pickDate}
                  minDate={new Date("2017-01-01")}
                  onChange={(date) => pickDateChange(date)}
                  renderInput={(params) => (
                    <TextField className={"dateText"} {...params} />
                  )}
                  InputProps={{ className: classes.input }}
                />
                {/* <p style={{ marginLeft: "30px" }}>Time</p> */}
                <TimePicker
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  name="pickTime"
                  format="24hr"
                  hintText="00:00"
                  onChange={(value) => onChangePickTime(value)}
                  value={loadDetail.pickTime}
                  fullWidth
                  renderInput={(params) => (
                    <TextField className={"dateText"} {...params} />
                  )}
                  InputProps={{ className: classes.input }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <small>In Time:</small>
                  {/* <p> ???</p> */}
                  <TimePicker
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                    // name="pickTime"
                    format="24hr"
                    hintText="00:00"
                    // onChange={(value) => onChangePickTime(value)}
                    // value={loadDetail.pickTime}
                    fullWidth
                    renderInput={(params) => (
                      <TextField className={"dateText"} {...params} />
                    )}
                    InputProps={{ className: classes.input }}
                  />
                </div>
                <div>
                  <small>Out Time: </small>
                  {/* <p style={{ marginLeft: "20px" }}>???</p> */}
                  <TimePicker
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                    // name="pickTime"
                    format="24hr"
                    hintText="00:00"
                    // onChange={(value) => onChangePickTime(value)}
                    // value={loadDetail.pickTime}
                    fullWidth
                    renderInput={(params) => (
                      <TextField className={"dateText"} {...params} />
                    )}
                  />
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
                {/* <p>Aug, 2 08:00</p> */}
                <DesktopDatePicker
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  value={loadDetail.dropDate}
                  minDate={new Date("2017-01-01")}
                  onChange={(date) => dropDateChange(date)}
                  renderInput={(params) => (
                    <TextField className={"dateText"} {...params} />
                  )}
                />
                {/* <p style={{ marginLeft: "20px" }}>Time</p> */}
                <TimePicker
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  name="dropTime"
                  format="24hr"
                  hintText="00:00"
                  onChange={(value) => onChangeDropTime(value)}
                  value={loadDetail.dropTime}
                  fullWidth
                  renderInput={(params) => (
                    <TextField className={"dateText"} {...params} />
                  )}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <small>In Time:</small>
                  {/* <p> ???</p> */}
                  <TimePicker
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                    // name="pickTime"
                    format="24hr"
                    hintText="00:00"
                    // onChange={(value) => onChangePickTime(value)}
                    // value={loadDetail.pickTime}
                    fullWidth
                    renderInput={(params) => (
                      <TextField className={"dateText"} {...params} />
                    )}
                  />
                </div>
                <div>
                  <small>Out Time: </small>
                  {/* <p style={{ marginLeft: "20px" }}>???</p> */}
                  <TimePicker
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                    // name="pickTime"
                    format="24hr"
                    hintText="00:00"
                    // onChange={(value) => onChangePickTime(value)}
                    // value={loadDetail.pickTime}
                    fullWidth
                    renderInput={(params) => (
                      <TextField className={"dateText"} {...params} />
                    )}
                  />
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
          >
            <IconContext.Provider
              value={{
                color: "#F5292F",
                size: "30px",
              }}
            >
              <div>
                <MdContentCopy onClick={duplicateLoad} />
                <FaTools style={{ marginLeft: "20px" }} onClick={editLoad} />
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
