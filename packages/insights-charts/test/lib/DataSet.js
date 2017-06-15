import { expect } from 'chai';
import DataSet from '../../source/js/lib/DataSet';

const seriesDataFixture = {
  categories: ['category 1', 'category 2', 'category 3'],
  series: [{
    title: 'series 1',
    data: [1, 1, 1],
  }, {
    title: 'series 2',
    data: [2, 2, 2],
  }],
};

const badDataFixture = {
  categories: ['category 1', 'category 2', 'category 3'],
  series: [{
    title: 'series 1',
    data: [1],
  }],
};

describe('DataSet', () => {
  describe('getSeries', () => {
    it('should throw an error if the length of the data doesn\'t equal the length of its categories', () => {
      expect(() => new DataSet(badDataFixture)).to.throw(Error);
    });

    it('should convert the data objects into the correct format', () => {
      const dataset = new DataSet(seriesDataFixture);
      const series = dataset.getSeries();

      series.forEach((s, seriesIndex) => {
        const seriesCount = seriesIndex + 1;

        s.data.forEach((d, dataIndex) => {
          const categoryCount = dataIndex + 1;
          expect(d.x).to.equal(`category ${categoryCount}`);
          expect(d.y).to.equal(seriesCount);
        });
      });

      expect(series[0].data).to.have.length(3);
    });

    it('should stack the data when using stacked layout', () => {
      const dataset = new DataSet(seriesDataFixture, { layout: 'stacked' });
      const series = dataset.getSeries();

      series.forEach((s, seriesIndex) => {
        const prevIndex = seriesIndex - 1;
        const seriesCount = seriesIndex + 1;

        s.data.forEach((d, datumIndex) => {
          const prevDatum = series[prevIndex] ? series[prevIndex].data[datumIndex] : { y: 0 };
          const categoryCount = datumIndex + 1;

          expect(d.x).to.equal(`category ${categoryCount}`);
          expect(d.y).to.equal(seriesCount);
          expect(d.y0).to.equal(prevDatum.y);
        });
      });

      expect(series[0].data).to.have.length(3);
    });
  });
});
