const filterStations = (searchQuery: string, stationName: string) => {
    const normalizeString = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]/gi, "");
  return normalizeString(stationName).includes(normalizeString(searchQuery));
};

export default filterStations;