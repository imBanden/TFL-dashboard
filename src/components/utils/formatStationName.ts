function formatStationName(stopPoint: string) {
    if (!stopPoint) return "";
    let newString: string = stopPoint.replace(/DLR Station|Underground Station|Rail Station/g, "");
    return newString;
}

export default formatStationName;