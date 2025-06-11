// import profilePic from "../assets/pp.jpg";
import styles from "./Card.module.css";
import PropTypes from "prop-types";

function Card({
  name = "test",
  decription = "test desc",
  age = "0",
  isStaff = false,
}) {
  return (
    <div className={isStaff ? styles.staffCard : styles.card}>
      <img src="" alt="profile pic" />
      <h2> {name}</h2>
      <p> {decription}</p>
      <p> {age}</p>
      <p> {isStaff ? "Yes" : "NO"}</p>
    </div>
  );

  //   return (
  //     <div className={styles.card}>
  //       <img src="" alt="profile pic" />
  //       <h2> {name}</h2>
  //       <p> {decription}</p>
  //       <p> {age}</p>
  //       <p> {isStaff ? "Yes" : "NO"}</p>
  //     </div>
  //   );
}

Card.PropTypes = {
  name: PropTypes.string,
  decription: PropTypes.string,
  age: PropTypes.number,
  isStaff: PropTypes.bool,
};
export default Card;
