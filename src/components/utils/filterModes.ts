const filterModes = (stationModes: string[]) => {
    const desiredModes = [
        'bakerloo',
        'central',
        'circle',
        'district',
        'elizabeth',
        'hammersmith-city',
        'jubilee',
        'metropolitan',
        'northern',
        'piccadilly',
        'victoria',
        'waterloo-city',
        'dlr',
        'london-overground'
    ]

    return stationModes.filter(mode => desiredModes.includes(mode))


}

export default filterModes