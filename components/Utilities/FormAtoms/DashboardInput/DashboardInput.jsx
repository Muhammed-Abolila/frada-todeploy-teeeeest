import "./DashboardInput.css"
export const DashboardInput = ({ register,setResponseError, registerValue, error, responseError }) => {
  return (
    <div className="input-dashboard">
      <input
        style={{
          direction: "rtl",
          borderBottom: (error?.message || responseError) ? "1px solid #b00020" : "1px solid #05060538",
        }}
        {...register(registerValue, {
          onChange: () => setResponseError('')
        })}
      />
      {(error?.message || responseError) && (
        <div>
          <span className="icon-notice"></span>
          <span className="error-msg">{error?.message || responseError}</span>
        </div>
      )}
    </div>
  );
};
