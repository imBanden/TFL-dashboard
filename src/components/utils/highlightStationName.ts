const highlightStationName = (text:string, header:boolean) => {
  let firstLineIndex = text.toLowerCase().indexOf('line');
  const docklandsIndex = text.toLowerCase().indexOf('docklands light railway')

  const tubeNameLengthSkip = 6
  const dlrNameLengthSkip = 24

  let currNameLengthSkip = tubeNameLengthSkip

  // console.log(firstLineIndex, docklandsIndex)

  if (docklandsIndex === 0) {
    firstLineIndex = docklandsIndex + dlrNameLengthSkip + 1
    currNameLengthSkip = 0
  }

  if (header){
    return text.substring(0, firstLineIndex).trim();
    }
  else{
    return text.substring(firstLineIndex + currNameLengthSkip, text.length).trim()
    }
}

export default highlightStationName