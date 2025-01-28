const NotifyComp = ({ notify }) => {
  return <p style={{
    fontSize:"16px",
    textAlign: "center",
    color:notify.state=="success"?"#44cc11":notify.state=="error"?"#bf1029":"#ffcc00"
  }}>{notify.msg}</p>;
};
export default NotifyComp;
