import { StopPoint } from "../arrivals/ArrivalsPage"

const sortAlphabetically = (stopPointsData: StopPoint[]) => {
    return stopPointsData.sort((a, b) => a.commonName.localeCompare(b.commonName))
}

export default sortAlphabetically