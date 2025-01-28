"use client";
import Link from "next/link";
import "./FixedFooter.css";
// import FixedFooterHook from "@/CustomHooks/FixedFooterHook";
import SocialLinks from "../SocialLinks/SocialLinks";
import FixedFooterHook from "@/app/customHooks/FixedFooterHook/FixedFooterHook";
// import FixedFooterHook from "@/app/customHooks/FixedFooterHook/FixedFooterHook";
export default function FixedFooter() {
  const [shape, activeIndex, navigateToRoute] = FixedFooterHook();
  return (
    <div className="holder" style={{ backgroundImage: `url(${shape.src})` }}>
      <div className="navigation">
        <ul>
          <li className={`list ${activeIndex === 0 ? "active" : ""}`}>
            <Link
              href="https://wa.me/+966557665585"
              target="_blank"
              className="footer-link"
            >
              <span className="icon" width="50px" height="50px">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.574"
                  height="28.795"
                viewBox="0 0 253.453 253.174"
              >
                <g id="black" transform="translate(-7072 -7066.826)">
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M7073,7320l-1-1a20.345,20.345,0,0,0,.9-2.2c5.4-19.7,10.9-39.5,16.4-59.2a6.057,6.057,0,0,0-.6-4.9c-16.4-30.3-19.9-62.1-10.8-95.2,16.8-60.5,78.1-97.9,139.1-89.5,28.7,3.9,53.5,16.2,73.3,37.7,32.1,34.9,42.7,75.8,29.8,121.3-21.5,76.3-109.1,113.2-179.4,76.6a5.862,5.862,0,0,0-3.9-.5c-14.9,3.8-29.8,7.6-44.7,11.5C7085.8,7316.4,7079.4,7318.2,7073,7320Zm29.5-30.4c1.2-.3,1.9-.4,2.6-.6,11.5-3,22.9-5.9,34.4-9a5.467,5.467,0,0,1,4.8.7c24.8,14.8,51.4,19.3,79.6,12.5a104.147,104.147,0,0,0,78.5-120.8c-10.1-53.4-60.7-90.6-114.8-84.3-31.4,3.7-56.3,18.6-74.3,44.6-15.7,22.7-21.6,47.9-17.5,75.3a102.115,102.115,0,0,0,16,41.1,4.751,4.751,0,0,1,.6,4.6c-.9,3-1.7,6-2.5,9C7107.4,7271.6,7105,7280.4,7102.5,7289.6Z"
                    fill={`${activeIndex === 0 ? "#fff" : "#888"}`}
                  />
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M7232.5,7252c-8.5.3-15.8-3-23.2-5.5-21.3-7.3-37.7-21.1-51.7-38.2-6.7-8.2-13.5-16.4-17.9-26.2-4.7-10.3-6.6-20.8-1.7-31.5,2.1-4.6,5.3-8.6,8.3-12.7a9.625,9.625,0,0,1,7.8-3.7,78.4,78.4,0,0,1,8.4.1c2.5.1,3.7,2,4.6,4,2,4.5,3.9,9.1,5.8,13.6,1.5,3.6,3,7.3,4.6,10.9,1.1,2.5,1.1,4.8-.5,7-2.3,3.2-4.7,6.3-7.2,9.4-2.6,3.2-2.7,4.1-.6,7.7,10.1,16.7,23.9,29,42,36.3,3.9,1.6,5.2,1.3,7.9-1.9,3-3.6,5.9-7.3,8.8-11,1.9-2.5,3.2-3.1,6.2-2,4.1,1.6,8.2,3.5,12.2,5.3,2.8,1.3,5.4,2.8,8.2,4,2,.9,4.1,1.4,6.1,2.2a3.712,3.712,0,0,1,2.5,3.9c-.1,8.5-1.9,16.1-9.4,21.4C7247.2,7249.5,7240.2,7252.4,7232.5,7252Z"
                    fill={`${activeIndex === 0 ? "#fff" : "#888"}`}
                  />
                </g>
              </svg>
              </span>
              <span className="text">تواصل معنا</span>
            </Link>
          </li>
          <li className={`list ${activeIndex === 1 ? "active" : ""}`}>
            <div
              className="footer-link"
              onClick={() => {
                navigateToRoute("cart");
              }}
            >
              <span className="icon" width="50px" height="50px">
                <svg
                  id="Group_53"
                  data-name="Group 53"
                  width="35.122"
                  height="31.535"
                  viewBox="0 0 35.122 31.535"
                >
                  <g
                    id="Group_52"
                    data-name="Group 52"
                    clipPath="url(#clipPath)"
                  >
                    <path
                      id="Path_612"
                      data-name="Path 612"
                      d="M13.456,22.308c3.108,0,6,0,8.887,0,3.339,0,6.68-.039,10.017.048.571.015,1.123.572,1.684.878-.577.36-1.149,1.026-1.732,1.033-5.985.077-11.973.108-17.956-.01A4.055,4.055,0,0,1,11.4,22.981a2.807,2.807,0,0,1,.6-2.861c1.809-1.484,1.3-2.795.478-4.431Q9.565,9.872,6.957,3.938A2.655,2.655,0,0,0,4.2,2.174a13.743,13.743,0,0,1-3-.275C.735,1.787.4,1.22,0,.858.433.557.874-.009,1.3,0A25.086,25.086,0,0,1,6.914.486C7.735.7,8.478,1.858,8.8,2.723c.561,1.5,1.434,1.983,3.25,2.008,7.116.1,14.229.416,21.345.582,1.5.035,1.861.616,1.686,1.778-.457,3.046-.934,6.09-1.317,9.143-.143,1.141-.662,1.628-1.99,1.732-4.7.369-9.4.844-14.1,1.264-2.345.21-3.228.792-4.222,3.079M10.719,6.7c1.666,3.537,3.136,6.731,4.706,9.886a1.806,1.806,0,0,0,1.406.68q6.766-.531,13.515-1.233c.437-.045,1.127-.451,1.182-.761.45-2.566.778-5.15,1.169-7.918L10.719,6.7"
                      transform="translate(0 0)"
                      fill={`${activeIndex === 1 ? "#fff" : "#888"}`}
                    />
                    <path
                      id="Path_613"
                      data-name="Path 613"
                      d="M74.41,81.34a3.467,3.467,0,0,1-3.592-3.189,3.386,3.386,0,0,1,3.574-3.178,3.316,3.316,0,0,1,3.556,3.161A3.359,3.359,0,0,1,74.41,81.34"
                      transform="translate(-44.032 -49.808)"
                      fill={`${activeIndex === 1 ? "#fff" : "#888"}`}
                    />
                    <path
                      id="Path_614"
                      data-name="Path 614"
                      d="M29.473,77.984a3.376,3.376,0,0,1,3.748-3.023,3.338,3.338,0,0,1,3.339,3.408,3.474,3.474,0,0,1-3.68,2.959,3.292,3.292,0,0,1-3.407-3.345"
                      transform="translate(-18.322 -49.796)"
                      fill={`${activeIndex === 1 ? "#fff" : "#888"}`}
                    />
                  </g>
                </svg>
                <span
                    className="cart-qty"
                    style={{
                      color: `${activeIndex === 1 ? "#000" : "#fff"}`,
                      backgroundColor: `${activeIndex === 1 ? "#fff" : "#888"}`,
                    }}
                  >
                    0
                  </span>
              </span>
              <span className="text">سـلـتــــي</span>
            </div>
          </li>
          <li className={`list ${activeIndex === 2 ? "active" : ""}`}>
            <Link href="/" className="footer-link">
              <span className="icon" width="50px" height="50px">
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
                        fill={`${activeIndex === 2 ? "#fff" : "#888"}`}
                      />
                      <path
                        id="Path_26"
                        data-name="Path 26"
                        d="M90.038,45.4l20.709,11.954L104.1,61.56l-14.059-8.5Z"
                        transform="translate(-90.038 -33.022)"
                        fill={`${activeIndex === 2 ? "#fff" : "#888"}`}
                      />
                      <path
                        id="Path_27"
                        data-name="Path 27"
                        d="M90.038,93.467l7.1-4.206V97.34l-7.1,4.63Z"
                        transform="translate(-90.038 -64.929)"
                        fill={`${activeIndex === 2 ? "#fff" : "#888"}`}
                      />
                    </g>
                  </g>
                </svg>
              </span>
              <span className="text">فرادا</span>
            </Link>
          </li>
          <li className={`list ${activeIndex === 3 ? "active" : ""}`}>
            <div
              className="footer-link"
              onClick={() => navigateToRoute("wishes")}
            >
              <span className="icon" width="50px" height="50px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35.444"
                  height="28.136"
                  viewBox="0 0 35.444 28.136"
                >
                  <path
                    id="My_Wishes_Button_icon"
                    d="M0,9.242V7.807c.044-.255.087-.51.132-.765.951-5.356,6.424-8,11.246-6.727A9.14,9.14,0,0,1,16.5,4c.153.211.3.428.463.669.183-.264.337-.5.506-.728A8.94,8.94,0,0,1,26.009.066a8.488,8.488,0,0,1,7.831,9.717,9.665,9.665,0,0,1-2.212,4.67,29.056,29.056,0,0,1-4.983,4.684c-2.647,2.043-5.334,4.04-8,6.057-.557.421-1.113.845-1.663,1.262-.054-.032-.084-.045-.109-.065-2.588-1.946-5.183-3.885-7.763-5.841A44.942,44.942,0,0,1,3.061,15.33,11.3,11.3,0,0,1,.376,10.973C.206,10.407.123,9.82,0,9.242"
                    transform="translate(0.75 0.779)"
                    fill="none"
                    stroke={`${activeIndex === 3 ? "#fff" : "#888"}`}
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <span className="text">امنياتي</span>
            </div>
          </li>
          <li className={`list ${activeIndex === 4 ? "active" : ""}`}>
            <div
              className="footer-link"
              onClick={() => {
                navigateToRoute("dashboard");
              }}
            >
              <span className="icon" width="50px" height="50px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22.285"
                  height="24.146"
                  viewBox="0 0 22.285 24.146"
                >
                  <g
                    id="My_account_icon"
                    transform="translate(-943.048 -170.077)"
                  >
                    <path
                      id="Path_670"
                      data-name="Path 670"
                      d="M44.879,87.666c-2.6,0-5.2,0-7.806,0a2.646,2.646,0,0,1-2.791-2.218,7.9,7.9,0,0,1,.137-2.54,10.14,10.14,0,0,1,5.913-7.416.558.558,0,0,1,.594.046,6.979,6.979,0,0,0,7.661-.079.516.516,0,0,1,.553-.08,10.147,10.147,0,0,1,6.3,8.338,5.788,5.788,0,0,1,.014,1.748,2.672,2.672,0,0,1-2.62,2.2c-.14,0-.281,0-.421,0H44.879"
                      transform="translate(909.316 106.055)"
                      fill="none"
                      stroke={`${activeIndex === 4 ? "#fff" : "#888"}`}
                      strokeWidth="1.5"
                    />
                    <path
                      id="Path_671"
                      data-name="Path 671"
                      d="M59.882,44.435a5,5,0,1,1,4.99-5.031,5.013,5.013,0,0,1-4.99,5.031"
                      transform="translate(894.141 136.137)"
                      fill="none"
                      stroke={`${activeIndex === 4 ? "#fff" : "#888"}`}
                      strokeWidth="1/5"
                    />
                  </g>
                </svg>
              </span>
              <span className="text">حسابي</span>
            </div>
          </li>
          <div className="indicator"></div>
        </ul>
      </div>
      <div className="social-links-container">
        <SocialLinks />
      </div>
    </div>
  );
}
