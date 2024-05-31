const distanceMap: { [key: number]: number } = {
  2: 7500000,
  3: 7500000,
  4: 4000000,
  5: 1800000,
  6: 600000,
  7: 300000,
  8: 180000,
  9: 80000,
  10: 40000,
  11: 30000,
  12: 15000,
  13: 10000,
  14: 4500,
  15: 2000,
  16: 1000,
  17: 700,
};

/**
 *
 * @param zoom
 * @returns distance
 */
export const zoomToDistance = (zoom: number) => {
  const windowZoom = Math.floor(zoom);
  const maxDistance = distanceMap[windowZoom];
  return maxDistance;
};

/**
 *
 * @param {number} zoom current zoom
 * @returns {number} limit
 */
export const zoomToLimit = (zoom: number) => {
  let limit = 999;
  if (zoom < 14) {
    limit = 35;
  } else if (zoom < 15) {
    limit = 25;
  } else {
    limit = 15;
  }
  return limit;
};
