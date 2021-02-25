import React from "react";
import "./Sidebar.scss";
function Sidebar({ show }: any) {
  return (
    <div className="friends_sidebar">
      {/* <p className={`${props}`}></p> */}
      <p className={`friends_name ${show === "A" ? "show" : ""}`}>A</p>
      <p className={`friends_name ${show === "B" ? "show" : ""}`}>B</p>
      <p className={`friends_name ${show === "C" ? "show" : ""}`}>C</p>
      <p className={`friends_name ${show === "D" ? "show" : ""}`}>D</p>
      <p className={`friends_name ${show === "E" ? "show" : ""}`}>E</p>
      <p className={`friends_name ${show === "F" ? "show" : ""}`}>F</p>
      <p className={`friends_name ${show === "G" ? "show" : ""}`}>G</p>
      <p className={`friends_name ${show === "H" ? "show" : ""}`}>H</p>
      <p className={`friends_name ${show === "I" ? "show" : ""}`}>I</p>
      <p className={`friends_name ${show === "J" ? "show" : ""}`}>J</p>
      <p className={`friends_name ${show === "K" ? "show" : ""}`}>K</p>
      <p className={`friends_name ${show === "L" ? "show" : ""}`}>L</p>
      <p className={`friends_name ${show === "M" ? "show" : ""}`}>M</p>
      <p className={`friends_name ${show === "N" ? "show" : ""}`}>N</p>
      <p className={`friends_name ${show === "O" ? "show" : ""}`}>O</p>
      <p className={`friends_name ${show === "P" ? "show" : ""}`}>P</p>
      <p className={`friends_name ${show === "Q" ? "show" : ""}`}>Q</p>
      <p className={`friends_name ${show === "R" ? "show" : ""}`}>R</p>
      <p className={`friends_name ${show === "S" ? "show" : ""}`}>S</p>
      <p className={`friends_name ${show === "T" ? "show" : ""}`}>T</p>
      <p className={`friends_name ${show === "U" ? "show" : ""}`}>U</p>
      <p className={`friends_name ${show === "V" ? "show" : ""}`}>V</p>
      <p className={`friends_name ${show === "W" ? "show" : ""}`}>W</p>
      <p className={`friends_name ${show === "X" ? "show" : ""}`}>X</p>
      <p className={`friends_name ${show === "Y" ? "show" : ""}`}>Y</p>
      <p className={`friends_name ${show === "Z" ? "show" : ""}`}>Z</p>
    </div>
  );
}

export default Sidebar;
