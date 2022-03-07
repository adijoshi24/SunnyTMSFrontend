import React, { Component, useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  catchError,
  ModalCloseHelper,
  onChangeHelper,
  SelectHelper,
  statesUSA,
  TextAreaHelper,
  TextInputHelper,
} from "../HelperCells";
import makeStyles from "@material-ui/styles/makeStyles";
import InputField from "../Atoms/form/InputField";
import {Grid} from "@mui/material";
const useStyles = makeStyles({
  root: {
    "& MuiFormControl-root": {
      width: "100%",
      fontSize: "1rem",
      fontWeight: "400",
      marginLeft: "5%",
      lineHeight: "1.75rem",
      color: "#212529",
      margin: "auto",
      backgroundClip: "padding-box",
      appearance: "none",
      padding: "4px 5px",
      border: "1px solid lightgrey",
      // "& .MuiInputBase-input": {
      //   width: "100%",
      //   border: "1px solid lightgrey",
      // },
    },
  },
});
const AddLoad = (props) => {
  const [modal, setModal] = useState(props.showAddModal);
  const [index, setIndex] = useState(0);
  const [newLoad, setNewLoad] = useState({
    pickDate: new Date(),
    dropDate: new Date(),
    customerRep: props.user.name,
    loadID: Math.round(Math.random() * 10000000),
    pickTime: "10:00",
    dropTime: "10:00",
  });
  const classes = useStyles();
  // componentWillReceiveProps(nextProps) {
  //   setState({ modal: nextProps.showAddModal });
  // }

  //Onchange
  const onChange = (e) => {
    onChangeHelper(newLoad, setNewLoad, e);
  };
  // Modal box Cancel function
  const handleCancel = () => {
    props.handleCancel();
  };
  const pickDateChange = (date) => {
    setNewLoad({
      ...newLoad,
      pickDate: date,
    });
  };
  const onChangePickTime = (time) => {
    setNewLoad({
      ...newLoad,
      pickTime: time,
    });
  };
  const dropDateChange = (date) => {
    setNewLoad({
      ...newLoad,
      dropDate: date,
    });
  };

  const onChangeDropTime = (time) => {
    setNewLoad({
      ...newLoad,
      dropTime: time,
    });
  };
  // Submit Function
  const addLoad = (e) => {
    e.preventDefault();
    let data = newLoad;
    axios
      .post("http://localhost:5000/api/load/add-load", data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Load addition Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleCancel();
          props.loads();
        } else {
          toast.error("Load addition Unsuccessful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        catchError(err);
      });
  };
  const handleSelectNext = (e) => {
    setIndex(index != 7 ? index + 1 : index);
  };
  const handleSelectPrevious = (e) => {
    setIndex(index != 0 ? index - 1 : index);
  };

  return (
    <Modal show={modal} onHide={handleCancel} className="addLoad" centered>
      <form encType="multipart/form-data">
        <Modal.Body>
          <Carousel
            interval={null}
            activeIndex={index}
            onSelect={(e) => handleSelectNext()}
            controls={false}
          >
            {/* index 0 (Customer info / load #) */}
            <Carousel.Item>
              <ModalCloseHelper header={"New Load"} divStyle={{marginBottom: '5rem', fontSize: 17}} />
              <SelectHelper
                name={"customerName"}
                onChangeFunc={onChange}
                placeholderTxt={"Customer Name"}
                options={
                  props &&
                  props.allCustomers &&
                  props.allCustomers.map((customer, i) => {
                    return props.user.role == "admin" ? (
                      <option value={customer.customerFullName} key={i}>
                        {customer.customerFullName}
                      </option>
                    ) : (
                      customer.customerRep == props.user.name && (
                        <option value={customer.customerFullName} key={i}>
                          {customer.customerFullName}
                        </option>
                      )
                    );
                  })
                }
              />
              {props.user.role === "admin" && (
                <SelectHelper
                  name={"customerRep"}
                  onChangeFunc={onChange}
                  placeholderTxt={"Customer Rep"}
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
              <TextInputHelper
                placeholderTxt={"Random Load#"}
                name={"loadID"}
                onChangeFunc={onChange}
                defaultValueField={newLoad.loadID}
              />
              <TextInputHelper
                placeholderTxt={"Customer Amount"}
                name={"customerAmount"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Carrier Amount"}
                name={"carrierAmount"}
                onChangeFunc={onChange}
              />
            </Carousel.Item>
            {/* index 1 (Pickup name,address etc) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Pickup"} />
              <TextInputHelper
                placeholderTxt={"Shipper Name"}
                name={"pickShipperName"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Address"}
                name={"pickAddress"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"City"}
                name={"pickCity"}
                onChangeFunc={onChange}
              />
              <SelectHelper
                name={"pickState"}
                onChangeFunc={onChange}
                placeholderTxt={"State"}
                options={statesUSA.map((state, i) => (
                  <option value={[state.abbreviation, state.name]} key={i}>
                    {state.name}
                  </option>
                ))}
              />
              {/* <SelectHelperMUI
                name={"pickState"}
                onChangeFunc={onChange}
                placeholderTxt={"State"}
                options={statesUSA.map((state,i) => (
                  <MenuItem value={state.name} key={i}>{state.name}</MenuItem>
                ))}
              /> */}
              <TextInputHelper
                placeholderTxt={"Zip"}
                name={"pickZip"}
                onChangeFunc={onChange}
              />
              <DesktopDatePicker
                InputProps={{
                  disableUnderline: true,
                }}
                value={newLoad.pickDate}
                minDate={new Date("2017-01-01")}
                onChange={(date) => pickDateChange(date)}
                renderInput={(params) => (
                  <TextField className={"dateText border"} {...params} />
                )}
              />
              <br></br>
              <br></br>
              <TimePicker
                InputProps={{
                  disableUnderline: true,
                }}
                name="pickTime"
                format="24hr"
                hintText="00:00"
                onChange={(value) => onChangePickTime(value)}
                value={newLoad.pickTime}
                fullWidth
                renderInput={(params) => (
                  <TextField className={"dateText border"} {...params} />
                )}
              />
              <br></br>
            </Carousel.Item>
            {/* index 2 (Pickup info: commodity, weight, trailer type etc) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Pickup"} />
              {/* <TextInputHelper
                
                placeholderTxt={"Reference#"}
                name={"pickReferenceId"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                
                placeholderTxt={"PO Number"}
                name={"pickPONumber"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                
                placeholderTxt={"Stop Type"}
                name={"pickStopType"}
                onChangeFunc={onChange}
              /> */}
              <TextInputHelper
                placeholderTxt={"Commodity"}
                name={"pickCommodity"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Weight"}
                name={"pickWeight"}
                onChangeFunc={onChange}
              />
              <SelectHelper
                name={"trailerType"}
                onChangeFunc={onChange}
                placeholderTxt={"Trailer Type"}
                options={
                  <>
                    <option value="Dry Van">Dry Van</option>
                    <option value="Reefer">Reefer</option>
                  </>
                }
              />
            </Carousel.Item>
            {/* index 3 (PU Number, PO Number, Reference#) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Pickup"} />
              <TextInputHelper
                placeholderTxt={"PU Number"}
                name={"pickPUNumber"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"PO Number"}
                name={"pickPONumber"}
                onChangeFunc={onChange}
              />
              {/* <TextInputHelper
                
                placeholderTxt={"Stop Type"}
                name={"pickStopType"}
                onChangeFunc={onChange}
              /> */}
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"pickReferenceId1"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"pickReferenceId2"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"pickReferenceId3"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"pickReferenceId4"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"pickReferenceId5"}
                onChangeFunc={onChange}
              />
            </Carousel.Item>
            {/* index 4 (carrier notes etc) */}
            <Carousel.Item>
              <ModalCloseHelper header={"Pickup"} />
              <InputField
                name={"pickCarrierNotes"}
                onChange={onChange}
                label={"Carrier Notes"}
                as={'textarea'}
                rows={15}
                className={'shadow-none'}
              />
            </Carousel.Item>
            {/* index 5 (Drop name,address etc) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Delivery"} />
              <TextInputHelper
                placeholderTxt={"Receiver Name"}
                name={"dropReceiverName"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Receiver Address"}
                name={"dropAddress"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"City"}
                name={"dropCity"}
                onChangeFunc={onChange}
              />
              <SelectHelper
                name={"dropState"}
                onChangeFunc={onChange}
                placeholderTxt={"State"}
                options={statesUSA.map((state, i) => (
                  <option value={[state.abbreviation, state.name]} key={i}>
                    {state.name}
                  </option>
                ))}
              />
              <TextInputHelper
                placeholderTxt={"Zip"}
                name={"dropZip"}
                onChangeFunc={onChange}
              />
              <DesktopDatePicker
                placeholder="-select date-"
                className={classes.root}
                InputProps={{
                  disableUnderline: true,
                }}
                value={newLoad.dropDate}
                onChange={(date) => dropDateChange(date)}
                renderInput={(params) => (
                  <TextField className={"dateText border"} {...params} />
                )}
              />
              <br></br>
              <br></br>
              <TimePicker
                className={classes.root}
                InputProps={{
                  disableUnderline: true,
                }}
                name="dropTime"
                format="24hr"
                hintText="Delivery Time"
                onChange={(value) => onChangeDropTime(value)}
                value={newLoad.dropTime}
                fullWidth
                renderInput={(params) => (
                  <TextField className={"dateText border"} {...params} />
                )}
              />
              <br></br>
            </Carousel.Item>
            {/* index 6 (Drop info: ref#, PO & stop type) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Delivery"} />
              <TextInputHelper
                placeholderTxt={"Delivery Number"}
                name={"dropDeliveryNumber"}
                onChangeFunc={onChange}
              />
              {/* <TextInputHelper
                
                placeholderTxt={"Stop Type"}
                name={"dropStopType"}
                onChangeFunc={onChange}
              /> */}
              <TextInputHelper
                placeholderTxt={"Reference#"}
                name={"dropReferenceId1"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"dropReferenceId2"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"dropReferenceId3"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"dropReferenceId4"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"dropReferenceId5"}
                onChangeFunc={onChange}
              />
              <TextInputHelper
                placeholderTxt={"Reference Number"}
                name={"dropReferenceId6"}
                onChangeFunc={onChange}
              />
            </Carousel.Item>
            {/* index 7 (Drop notes) */}
            <Carousel.Item>
              <ModalCloseHelper clickFunc={handleCancel} header={"Delivery"} />
              <InputField
                  name={"dropCarrierNotes"}
                  onChange={onChange}
                  label={"Carrier Notes"}
                  as={'textarea'}
                  rows={15}
                  className={'shadow-none'}
              />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <div style={{ display: "flex" }}>
          <Grid container justifyContent={'space-between'} sx={{p:2}}>
            <Grid item sx={{ml: 1, mt: 3}}>
              <AiOutlineLeft
                  onClick={() => handleSelectPrevious()}
                  style={
                    index === 0
                        ? { display: "none" }
                        : { display: "block", cursor: 'pointer',}
                  }
                  className="loadModalDirectionButton"
              />
            </Grid>
            {index === 7 && <Grid item sx={{mt: 3}}>
              <button
                  className="addButton"
                  onClick={addLoad}
              >
                Create Load
              </button>
            </Grid>}
          </Grid>
          <AiOutlineRight
            size={70}
            onClick={() => handleSelectNext()}
            style={
              index == 7
                ? { display: "none" }
                : {
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "25px",
                    marginBottom: '3rem',
                    marginTop: '3rem',
                    cursor: 'pointer'
                  }
            }
            className="loadModalDirectionButton"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddLoad;
