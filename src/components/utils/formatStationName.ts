function formatStationName(stopPoint: string) {
    let newString: string = stopPoint.replace(/DLR Station|Underground Station|Rail Station/g, "");
    return newString;
}

export default formatStationName;