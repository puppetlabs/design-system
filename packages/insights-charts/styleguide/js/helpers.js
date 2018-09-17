export function getRandomData(count, { min = 0, modifier = 100, negatives = false, sparseness = 0, z = false } = {}) {
  let points = [];
  let i = 0;

  while (i < count) {
    if (sparseness > 0 && Math.floor(Math.random() * 100) < sparseness) {
      points.push(null);
      i += 1;
      continue;
    }

    let randomNumber = Math.floor(Math.random() * modifier);

    if (negatives && randomNumber % 2 === 0) {
      randomNumber = -randomNumber;
    }

    if (points.indexOf(randomNumber) === -1 && randomNumber > min) {
      points.push(randomNumber);
      i += 1;
    }
  }

  // Generate an additional metric to extend the series, ie: bubbles
  if (z) {
    points = points.map(point => ({ y: point, z: (point * Math.floor(Math.random() * 10)) }));
  }

  return points;
}

export function getRandomDates(count) {
  const points = [];
  let i = 0;

  while (i < count) {
    const randomNumber = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));

    if (points.indexOf(randomNumber) === -1) {
      points.push(randomNumber.toLocaleDateString());
      i += 1;
    }
  }

  return points;
}

export function getRandomCategories(count, type = 'linear') {
  let categories = [];
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  switch (type) {
    case 'ordinal': {
      const letterIndexes = getRandomData(count, { min: 0, modifier: 25 });

      letterIndexes.forEach((letterIndex) => {
        categories.push(letters.split('')[letterIndex]);
      });
      break;
    }
    default: {
      categories = getRandomData(count, { min: 0, modifier: 100 });
      categories.sort((a, b) => (a - b));
    }
  }

  return categories;
}

class DataGenerator {
  constructor() {
    this.series = 1;
    this.dataConfig = { points: 10 };
    this.xScaleType = 'linear';
  }

  setSeriesCount(count) {
    this.series = count;
  }

  setDataConfig(config) {
    if (typeof config !== 'object') {
      throw new Error('The data configuration must be an object');
    }

    this.dataConfig = config;
  }

  setXScaleType(type) {
    this.xScaleType = type;
  }

  generate() {
    let i = 0;
    const data = {
      categories: getRandomCategories(this.dataConfig.points, this.xScaleType),
      series: [],
    };

    while (i < this.series) {
      data.series.push({
        title: `series ${i + 1}`,
        data: getRandomData(this.dataConfig.points, { min: this.dataConfig.min }),
      });

      i += 1;
    }

    return data;
  }
}

export default DataGenerator;
