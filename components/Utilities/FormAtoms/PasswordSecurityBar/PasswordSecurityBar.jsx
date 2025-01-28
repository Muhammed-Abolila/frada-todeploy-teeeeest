import "./PasswordSecurityBar.css"
export const PasswordSecurityBar = ({passwordStrength}) => {
  return (
    <>
    {passwordStrength != 0 && (
        <div className="pass-security-bar">
          <ul>
            <li
              style={{
                backgroundColor:
                  passwordStrength == 0
                    ? ""
                    : passwordStrength == 1
                    ? "red"
                    : passwordStrength == 2
                    ? "#ffc107"
                    : passwordStrength == 3
                    ? "#ffc107"
                    : passwordStrength == 4
                    ? "green"
                    : null,
              }}
            ></li>
            <li
              style={{
                backgroundColor:
                  passwordStrength == 0
                    ? ""
                    : passwordStrength == 1
                    ? ""
                    : passwordStrength == 2
                    ? "#ffc107"
                    : passwordStrength == 3
                    ? "#ffc107"
                    : passwordStrength == 4
                    ? "green"
                    : null,
              }}
            ></li>
            <li
              style={{
                backgroundColor:
                  passwordStrength == 0
                    ? ""
                    : passwordStrength == 1
                    ? ""
                    : passwordStrength == 2
                    ? "#ffc107"
                    : passwordStrength == 3
                    ? "#ffc107"
                    : passwordStrength == 4
                    ? "green"
                    : null,
              }}
            ></li>
            <li
              style={{
                backgroundColor:
                  passwordStrength == 0
                    ? ""
                    : passwordStrength == 1
                    ? ""
                    : passwordStrength == 2
                    ? ""
                    : passwordStrength == 3
                    ? ""
                    : passwordStrength == 4
                    ? "green"
                    : null,
              }}
            ></li>
            <li
              style={{
                backgroundColor:
                  passwordStrength == 0
                    ? ""
                    : passwordStrength == 1
                    ? ""
                    : passwordStrength == 2
                    ? ""
                    : passwordStrength == 3
                    ? ""
                    : passwordStrength == 4
                    ? "green"
                    : null,
              }}
            ></li>
          </ul>
          {passwordStrength == 0 ? (
            ""
          ) : passwordStrength == 1 ? (
            <div className="pass-security-desc" style={{ color: "red" }}>
              ضعيفة
            </div>
          ) : passwordStrength == 2 || passwordStrength == 3 ? (
            <div
              className="pass-security-desc"
              style={{ color: "#ffc107" }}
            >
              متوسطة
            </div>
          ) : passwordStrength == 4 ? (
            <div className="pass-security-desc" style={{ color: "green" }}>
              قوية
            </div>
          ) : null}
        </div>
      )}
      </>
  )
}
