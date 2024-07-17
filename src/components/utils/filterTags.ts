const filterTags = (tags: string[], lines: string[]) => {
    if (tags.length === 0) {
        return true
    }
    if (tags.includes('underground')){
        tags.push(...[
            'bakerloo',
            'central',
            'circle',
            'district',
            'hammersmith-city',
            'jubilee',
            'metropolitan',
            'northern',
            'piccadilly',
            'victoria',
            'waterloo-city',
        ])
    }
  return tags.some(tag => lines.includes(tag))
}

export default filterTags