"use client"
import { useState } from "react";
import "./FilterAndSortBar.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function FilterAndSortBar({
  grid,
  setGrid,
  filter,
  setFilter,
  selectedSort,
  setSelectedSort,
  setShowApplyAndDeleteBtn,
}) {
  const [toggleChevron, setToggleChevron] = useState(true);
  return (
    <div className="filter-sort-bar">
      <div className="filter-sort-grid-content">
        <div className="grid" onClick={() => setGrid(!grid)}>
          {grid == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="13"
              viewBox="0 0 42 43"
            >
              <g
                id="Group_68044"
                data-name="Group 68044"
                transform="translate(-482 -1242)"
              >
                <g id="Group_68041" data-name="Group 68041">
                  <rect
                    id="Rectangle_148069"
                    data-name="Rectangle 148069"
                    width="19"
                    height="19"
                    transform="translate(482 1242)"
                  />
                  <rect
                    id="Rectangle_148072"
                    data-name="Rectangle 148072"
                    width="19"
                    height="19"
                    transform="translate(482 1266)"
                  />
                  <rect
                    id="Rectangle_148070"
                    data-name="Rectangle 148070"
                    width="19"
                    height="19"
                    transform="translate(505 1242)"
                  />
                  <rect
                    id="Rectangle_148071"
                    data-name="Rectangle 148071"
                    width="19"
                    height="19"
                    transform="translate(505 1266)"
                  />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="13"
              viewBox="0 0 65 19"
            >
              <g
                id="Group_68043"
                data-name="Group 68043"
                transform="translate(-558 -1254)"
              >
                <g
                  id="Group_68042"
                  data-name="Group 68042"
                  transform="translate(99 12)"
                >
                  <rect
                    id="Rectangle_148069"
                    data-name="Rectangle 148069"
                    width="19"
                    height="19"
                    transform="translate(482 1242)"
                  />
                  <rect
                    id="Rectangle_148072"
                    data-name="Rectangle 148072"
                    width="19"
                    height="19"
                    transform="translate(459 1242)"
                  />
                  <rect
                    id="Rectangle_148070"
                    data-name="Rectangle 148070"
                    width="19"
                    height="19"
                    transform="translate(505 1242)"
                  />
                </g>
              </g>
            </svg>
          )}
        </div>

        <div className="sort-container">
          <DropdownButton
            id="dropdown-basic-button"
            title={`الترتيب حسب: ${
              selectedSort == ""
                ? "الأبرز"
                : selectedSort == "lth"
                ? "الأقل سعراً"
                : "الأعلي سعراً"
            }`}
            onClick={() => setToggleChevron(!toggleChevron)}
          >
            <Dropdown.Item onClick={() => setSelectedSort("")}>
              الأبرز
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedSort("htl")}>
              الأعلي سعراً
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedSort("lth")}>
              الأقل سعراً
            </Dropdown.Item>
          </DropdownButton>
          {toggleChevron ? (
            <span className="icon-cheveron-down"></span>
          ) : (
            <span className="icon-cheveron-up"></span>
          )}
        </div>
        <h5
          className="filter-btn"
          onClick={() => {
            setShowApplyAndDeleteBtn(true), setFilter(!filter);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="20"
            viewBox="0 0 37 20"
          >
            <g
              id="Group_3"
              data-name="Group 3"
              transform="translate(-683.5 -216)"
            >
              <line
                id="Line_1"
                data-name="Line 1"
                x2="35"
                transform="translate(684.5 220.5)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <line
                id="Line_2"
                data-name="Line 2"
                x2="35"
                transform="translate(684.5 231.5)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <g
                id="Ellipse_1"
                data-name="Ellipse 1"
                transform="translate(707 216)"
                fill="#fff"
                stroke="#000"
                strokeWidth="1"
              >
                <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                <circle cx="4.5" cy="4.5" r="4" fill="none" />
              </g>
              <g
                id="Ellipse_2"
                data-name="Ellipse 2"
                transform="translate(688 227)"
                fill="#fff"
                stroke="#000"
                strokeWidth="1"
              >
                <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                <circle cx="4.5" cy="4.5" r="4" fill="none" />
              </g>
            </g>
          </svg>
          {filter ? (
            <span>إخفاء فلتر البحث </span>
          ) : (
            <span>إظهار فلتر البحث</span>
          )}
        </h5>
      </div>
     
    </div>
  );
}
