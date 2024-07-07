function removeBus(lines: string[]) {
  // This line filters out any strings in the 'lines' array that contain a digit.
  return lines.filter((line) => !/\d/.test(line));
}

export default removeBus;