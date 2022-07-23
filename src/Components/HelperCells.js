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
export const statesUSA = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];
