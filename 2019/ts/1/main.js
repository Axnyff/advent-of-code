"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var fs = require("fs");
fs.readFile("./1/input", function (err, rawData) {
    var data = rawData
        .toString()
        .split("\n")
        .filter(function (el) { return el !== ""; })
        .map(function (i) { return parseInt(i, 10); });
    var part1 = data
        .map(function (mass) { return Math.floor(mass / 3) - 2; })
        .reduce(function (total, fuel) { return total + fuel; }, 0);
    var allFuel = function (n, existingFuel) {
        if (existingFuel === void 0) { existingFuel = []; }
        var fuel = Math.floor(n / 3) - 2;
        if (fuel > 0) {
            return allFuel(fuel, __spreadArrays(existingFuel, [fuel]));
        }
        return existingFuel;
    };
    var part2 = data
        .map(function (mass) { return allFuel(mass); })
        .reduce(function (acc, fuels) { return (__spreadArrays(acc, fuels)); }, [])
        .reduce(function (total, fuel) { return total + fuel; }, 0);
});
