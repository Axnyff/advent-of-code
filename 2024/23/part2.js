const fs = require("fs");

const data = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split("-"));

const connexions = {};
data.forEach((d) => {
  connexions[d[0]] = connexions[d[0]] || [];
  connexions[d[0]].push(d[1]);

  connexions[d[1]] = connexions[d[1]] || [];
  connexions[d[1]].push(d[0]);
});

const all = new Set();

const includeAll = (item, list) => {
  for (let i of list) {
    if (!connexions[item].includes(i)) {
      return false;
    }
  }
  return true;
};

const threes = new Set();
for (let start in connexions) {
  const items = connexions[start];
  for (let i = 0; i < items.length - 9; i++) {
    const item1 = items[i];
    for (let j = i + 1; j < items.length - 8; j++) {
      const item2 = items[j];
      for (let k = j + 1; k < items.length - 7; k++) {
        const item3 = items[k];
        for (let l = k + 1; l < items.length - 6; l++) {
          const item4 = items[l];
          for (let m = l + 1; m < items.length - 5; m++) {
            const item5 = items[m];
            for (let n = m + 1; n < items.length - 4; n++) {
              const item6 = items[n];
              for (let o = n + 1; o < items.length - 3; o++) {
                const item7 = items[o];
                for (let p = o + 1; p < items.length - 2; p++) {
                  const item8 = items[p];
                  for (let q = p + 1; q < items.length - 1; q++) {
                    const item9 = items[q];
                    for (let r = q + 1; r < items.length; r++) {
                      const item10 = items[r];
                      for (let s = q + 1; s < items.length; s++) {
                        const item11 = items[s];
                        for (let t = s + 1; t < items.length; t++) {
                          const item12 = items[t];
                          if (
                            includeAll(item1, [
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item2, [
                              item1,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item3, [
                              item1,
                              item2,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item4, [
                              item1,
                              item2,
                              item3,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item5, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item6, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item7, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item8,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item8, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item9,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item9, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item10,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item10, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item11,
                              item12,
                            ]) &&
                            includeAll(item11, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item12,
                            ]) &&
                            includeAll(item12, [
                              item1,
                              item2,
                              item3,
                              item4,
                              item5,
                              item6,
                              item7,
                              item8,
                              item9,
                              item10,
                              item11,
                            ])
                          ) {
                            threes.add(
                              [
                                start,
                                item1,
                                item2,
                                item3,
                                item4,
                                item5,
                                item6,
                                item7,
                                item8,
                                item9,
                                item10,
                                item11,
                                item12,
                              ]
                                .sort((a, b) => a.localeCompare(b))
                                .join(","),
                            );
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
console.log(threes);
