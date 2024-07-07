function formatStationName(stopPoint: string) {
    let newString: string = stopPoint.replace("DLR Station", "");
    newString = newString.replace("Underground Station", "").replace("Rail Station", "");
  return newString;
}

export default formatStationName;