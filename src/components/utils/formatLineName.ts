const formatLineName = (lineName: string) => {
    if (lineName === 'hammersmith-city') {
        return 'Hammersmith & City';
    }
    if (lineName === 'dlr') {
        return 'DLR';
    }
    else{
        return lineName.charAt(0).toUpperCase() + lineName.slice(1);
    }
};

export default formatLineName