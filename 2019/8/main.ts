import { printResult } from "..";
import fs from "fs";

const splitLayers = (data: number[], res: number[][] = []): number[][] => {
  const layerLength = 25 * 6;
  if (!data.length) {
    return res;
  }
  return splitLayers(data.slice(layerLength), [
    ...res,
    data.slice(0, layerLength)
  ]);
};

const part1 = (data: number[]) => {
  const layers = splitLayers(data);

  const [layerWithFewestZero] = layers
    .slice()
    .sort(
      (layerA, layerB) =>
        layerA.filter(el => el === 0).length -
        layerB.filter(el => el === 0).length
    );

  return (
    layerWithFewestZero.filter(el => el === 1).length *
    layerWithFewestZero.filter(el => el === 2).length
  );
};

const printLayer = (layer: number[]) => {
  const result = [];
  while (layer.length) {
    const lineToPrint = layer.slice(0, 25);
    layer = layer.slice(25);
    result.push(
      lineToPrint
        .map(el => {
          if (el === 0) {
            return "\x1b[40m \x1b[0m";
          }
          if (el === 1) {
            return "\x1b[47m \x1b[0m";
          }
          return " ";
        })
        .join("")
    );
  }
  return result.join("\n");
};

const part2 = (data: number[]) => {
  const layers = splitLayers(data);
  const pixels = layers[0].slice();

  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] === 2) {
      const newLayer = layers.find(layer => layer[i] !== 2);
      pixels[i] = newLayer ? newLayer[i] : pixels[i];
    }
  }
  return printLayer(pixels);
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .trim()
    .split("")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data), part2(data));
});
