import "./FormHead.css"
export const FormHead = ({title}) => {
  return (
    <div className="form-head">
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.214"
              height="37.041"
              viewBox="0 0 21.214 37.041"
            >
              <g id="Frada" transform="translate(-204.754 -843.606)">
                <g
                  id="FRADA_icon"
                  data-name="FRADA icon"
                  transform="translate(204.754 843.606)"
                >
                  <path
                    id="Path_25"
                    data-name="Path 25"
                    d="M90.038,4.04,96.689,0l14.564,8.166v8.25l-7.156,3.62-.252-7.913Z"
                    transform="translate(-90.038 0.001)"
                    fill="#fff"
                  />
                  <path
                    id="Path_26"
                    data-name="Path 26"
                    d="M90.038,45.4l20.709,11.954L104.1,61.56l-14.059-8.5Z"
                    transform="translate(-90.038 -33.022)"
                    fill="#fff"
                  />
                  <path
                    id="Path_27"
                    data-name="Path 27"
                    d="M90.038,93.467l7.1-4.206V97.34l-7.1,4.63Z"
                    transform="translate(-90.038 -64.929)"
                    fill="#fff"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="login-title">{title}</div>
        </div>
  )
}
