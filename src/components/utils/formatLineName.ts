const formatLineName = (lineName: string) => {
    if (lineName === 'hammersmith-city') {
        return 'Hammersmith & City';
    }
    if (lineName === 'waterloo-city') {
        return 'Waterloo & City';
    }
    if (lineName === 'dlr') {
        return 'DLR';
    }
    if (lineName === 'london-overground') {
        return 'Overground';
    }
    else{
        return lineName.charAt(0).toUpperCase() + lineName.slice(1);
    }
};

export default formatLineName