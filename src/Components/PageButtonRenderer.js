const pageButtonRenderer = ({ page, active, disable, title, onPageChange }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  const activeStyle = {
    borderRadius: "50%",
    height: "25px",
    width: "25px",
    display: "inline-block",
  };
  if (active) {
    activeStyle.backgroundColor = "#F5292F";
    activeStyle.color = "white";
  } else {
    activeStyle.backgroundColor = "white";
    activeStyle.border = "1px solid #8898AA";
    activeStyle.color = "#525F7F";
  }
  return (
    <li className="page-item" style={{ margin: "0 2px 0 2px" }}>
      <span href="#" onClick={handleClick} style={activeStyle}>
        {page}
      </span>
    </li>
  );
};
export default pageButtonRenderer;
