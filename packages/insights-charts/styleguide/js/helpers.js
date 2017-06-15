export function getRandomData(count, min = 0, modifier = 100, negatives = false) {
  const points = [];
  let i = 0;

  while (i < count) {
    let randomNumber = Math.floor(Math.random() * modifier);

    if (negatives && i % 2 === 0) {
      randomNumber = -randomNumber;
    }

    if (points.indexOf(randomNumber) === -1 && randomNumber > min) {
      points.push(randomNumber);
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
      const letterIndexes = getRandomData(count, 0, 25);

      letterIndexes.forEach((letterIndex) => {
        categories.push(letters.split('')[letterIndex]);
      });
      break;
    }
    default: {
      categories = getRandomData(count, 0, 100);
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
        data: getRandomData(this.dataConfig.points, this.dataConfig.min),
      });

      i += 1;
    }

    return data;
  }
}

export default DataGenerator;
