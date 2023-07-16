import seedrandom from "seedrandom";

export default function genColor(seed) {
  const random = seedrandom(seed);
  let color = Math.floor(random() * 16777215);
  color = color.toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }
  return "#" + color;
}
