import { AiFillEdit, AiFillDelete, AiFillCaretDown } from "react-icons/ai";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import pageButtonRenderer from "./PageButtonRenderer";
import Select from "@material-ui/core/Select";
import { BsChevronDown } from "react-icons/bs";
import FormHelperText from "@mui/material/FormHelperText";
import CrossIcon from "./Atoms/CrossIcon";

export const Logo = ({ clickFunc, style }) => {
  return (
    <p className="logoMain" onClick={clickFunc} style={style}>
      Sunny Logistics
    </p>
  );
};
export const ModalCloseHelper = ({ clickFunc, header, divStyle = {} }) => {
  return (
    <>
      <div style={{ display: "flex", ...divStyle }}>
        <p className="modalClose" onClick={clickFunc}>
          <CrossIcon />
        </p>
        <center style={{ margin: "auto" }}>
          <h4>{header}</h4>
        </center>
      </div>
      <br></br>
    </>
  );
};
export const CloseIcon = ({ clickFunc, divStyle = {} }) => {
  return (
    <>
      <div style={{ display: "flex", ...divStyle }}>
        <p className="modalClose" onClick={clickFunc}>
          <CrossIcon />
        </p>
      </div>
      <br></br>
    </>
  );
};
export const TextInputHelper = ({
  placeholderTxt,
  name,
  type,
  onChangeFunc,
  defaultValueField,
  style,
  editLoad,
  disabled,
  title,
}) => {
  return (
    <>
      {title ? <span className="titleAdd">{title}</span> : ""}
      <input
        onChange={onChangeFunc}
        id={disabled ? "disabled" : ""}
        className={editLoad ? "editLoadSelect inputText" : "inputText"}
        placeholder={placeholderTxt}
        type={type ? type : "text"}
        name={name}
        defaultValue={defaultValueField}
        style={style}
      />
    </>
  );
};
export const FooterHelper = ({
  deleteRecord,
  editRecord,
  grLinkNext,
  grLinkPrevious,
  buttonText,
  showEditIcon = false,
}) => {
  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      {grLinkPrevious ? (
        <GrLinkPrevious
          onClick={grLinkPrevious}
          className="loadModalDirectionButton"
          style={{ display: "block", marginLeft: "50px" }}
        />
      ) : (
        ""
      )}
      <center
        style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
      >
        {deleteRecord ? (
          <button className="deleteModalSubmitButton" onClick={deleteRecord}>
            <AiFillDelete
              style={{
                marginTop: "-5px",
              }}
            />
            Delete
          </button>
        ) : (
          ""
        )}
        {editRecord ? (
          <button className="addButton" onClick={editRecord}>
            {showEditIcon && <AiFillEdit />}
            {buttonText ? buttonText : "Update"}
          </button>
        ) : (
          ""
        )}
      </center>
      {grLinkNext ? (
        <GrLinkNext
          onClick={grLinkNext}
          className="loadModalDirectionButton"
          style={{
            display: "block",
            marginRight: "50px",
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export const SelectHelper = ({
  placeholderTxt,
  name,
  options,
  onChangeFunc,
  defaultValueField,
  style,
}) => {
  return (
    <div style={{ display: "flex" }} className="selectContainer">
      <select
        name={name}
        aria-label="Default select example"
        className="inputText selectInput"
        onChange={onChangeFunc}
        value={defaultValueField}
        style={style ? style : { margin: "auto" }}
      >
        <option>{placeholderTxt}</option>
        {options}
      </select>
      <BsChevronDown className="selectDownIcon" />
    </div>
  );
};
export const SelectHelperMUI = ({
  placeholderTxt,
  name,
  options,
  onChangeFunc,
  defaultValueField,
  style,
  icon,
  value,
}) => {
  return (
    <>
      <Select
        name={name}
        disableUnderline
        className="selectText"
        onChange={onChangeFunc}
        IconComponent={() => (
          <BsChevronDown style={{ strokeWidth: "2", color: "f5292f" }} />
        )}
        style={style ? style : { margin: "auto" }}
      >
        {options}
      </Select>
      {/* <FormHelperText>{placeholderTxt}</FormHelperText> */}
      <br></br>
      <br></br>
    </>
  );
};
export const ModalSelectHelper = ({
  placeholderTxt,
  name,
  options,
  onChangeFunc,
  defaultValueField,
  style,
  editLoad,
  disabled,
}) => {
  return (
    <>
      <select
        name={name}
        aria-label="Default select example"
        className={"inputText"}
        id={disabled ? "disabled" : ""}
        onChange={onChangeFunc}
        value={defaultValueField}
        style={style ? style : {}}
        // style={readOnly && { pointerEvents: "none" }}
      >
        <option>{placeholderTxt}</option>
        {options}
      </select>
    </>
  );
};
export const TextAreaHelper = ({
  placeholderTxt,
  name,
  onChangeFunc,
  defaultValueField,
  label = "",
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <textarea
        onChange={onChangeFunc}
        className="inputTextArea"
        placeholder={placeholderTxt}
        type="text"
        name={name}
        rows="17"
        value={defaultValueField}
      />
      <br></br>
    </>
  );
};
export const BootstrapTableHelper = ({
  myData,
  columns,
  tableRowEvents,
  rowStyle,
}) => {
  const options = {
    pageButtonRenderer,
  };
  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={myData}
      columns={columns}
      hover
      pagination={paginationFactory(options)}
      rowEvents={tableRowEvents}
      rowStyle={{
        border: "none",
        borderBottom: "1px solid #b5c7da",
        height: "40px",
        verticalAlign: "middle",
      }}
      bordered={false}
    />
  );
};
export const catchError = (err) => {
  console.log("err", err.response);
  console.log("err", err);
  if (!err.response.data.errors) {
    let errorText = err.response.status + " " + err.response.statusText;
    toast.error(errorText, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    var text = "";
    for (let i = 0; i < err.response.data.errors.length; i++) {
      text += `• ${err.response.data.errors[i].msg}. \n `;
    }
    console.log(text ? text : err.response.statusText);
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const onChangeHelper = (state, setState, e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });
};
