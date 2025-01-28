

import "./DashboardInput.css";

export const DashboardInput = ({ register, errors,
  isReadOnly , type , Name}) => {
  return (
    <div className="input-dashboard">
      <input

      readOnly={isReadOnly}
        style={{
          direction: "rtl",
          borderBottom:
            errors?.message 
              ? "1px solid #b00020"
              : "1px solid #05060538",
        }}

        type={type}
 
        {...register(Name)}
      />
      {errors?.[Name] && (
        <span className="text-red-600">{errors[Name].message}</span>
      )}
    </div>
  );
};
