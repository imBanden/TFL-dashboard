import { StopPoint } from "../arrivals/ArrivalsPage"

const removeFavouriteStation = (favouriteStopPoints: StopPoint[], naptanId:string) => {
    // console.log(favouriteStopPoints, naptanId)

    for (let i=0; i< favouriteStopPoints.length; i++){
        if (favouriteStopPoints[i].naptanId === naptanId){
            return [...favouriteStopPoints.slice(0, i),...favouriteStopPoints.slice(i + 1)]
        }
    }
//   return "hello"
}

export default removeFavouriteStation