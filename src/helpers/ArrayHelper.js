export const ArrayHelper = {
    GroupByDate: ({ Key, ArrayMap, StrSplit }) => {
        const newArrayMap = [];
        if (!ArrayMap || !Key) return [];

        ArrayMap.map(item => {
            let dayFull = item[Key];
            const d = dayFull.split(StrSplit)[0];
            var g = null;
            newArrayMap.every((_g) => {
                if (_g.day === d) g = _g;
                return g == null;
            })
            if (g === null) {
                g = {
                    day: d,
                    items: []
                };
                newArrayMap.push(g);
            }
            g.items.push(item);
        })
        return newArrayMap;
    },
    ReverseGroupByDate: (ArrayMap) => {
        if (!ArrayMap || ArrayMap.length === 0) return [];
        const newArrayMap = [];
        ArrayMap.map(item => {
            item.items.map(sub => newArrayMap.push(sub))
        });
        return newArrayMap;
    }
}