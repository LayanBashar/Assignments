function Food() {
  const food = ["Orange", "Banana", "Apple"];
  const foodList = food.map((p) => <li> {p}</li>);
  return <ul>{foodList}</ul>;
}
export default Food;
