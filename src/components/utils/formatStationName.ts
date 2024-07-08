function formatStationName(stopPoint: string) {
    if (!stopPoint) return "";
    let newString: string = stopPoint.replace(/Underground Station|Rail Station/g, "");
    return newString;
}

export default formatStationName;