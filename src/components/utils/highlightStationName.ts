const highlightStationName = (text:string, header:boolean) => {
  const firstLineIndex = text.indexOf('Line');

  if (header){
    return text.substring(0, firstLineIndex).trim();
    }
  else{
    return text.substring(firstLineIndex+6, text.length).trim()
    }
}

export default highlightStationName