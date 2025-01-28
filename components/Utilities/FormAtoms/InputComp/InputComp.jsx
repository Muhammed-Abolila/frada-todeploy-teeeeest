import "./InputComp.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

export const InputComp = ({
  register,
  registerValue,
  placeholder,
  inputType,
  readOnly,
  passwordValue,
  showPassword,
  setShowPassword,
  errors,
  responseError,
}) => {
  return (
    <div className="input-container">
      <input
        type={inputType}
        {...register(registerValue)}
        placeholder={placeholder}
        style={{
          border: errors?.message || responseError ? "1px solid #B00020" : "",
          opacity: readOnly ? ".5" : "1",
        }}
        readOnly={readOnly}
      />
      {errors?.message || responseError ? (
        <>
          <IoMdInformationCircleOutline className="icon-notice" />
          <p className="error-msg">{errors?.message || responseError}</p>
        </>
      ) : null}
      {/* if input type password show eye icon*/}
      {passwordValue?.length > 0 && (
        <>
          {showPassword ? (
            <FaRegEye
              className="icon-eye transform translate-x-6 translate-y-[-22px]"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEyeSlash
              className="icon-eye-off  transform translate-x-6 translate-y-[-22px]"
              onClick={() => setShowPassword(true)}
            />
          )}
        </>
      )}
    </div>
  );
};
