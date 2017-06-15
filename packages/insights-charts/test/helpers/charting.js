import { expect } from 'chai';
import helpers from '../../source/js/helpers/charting';

describe('helpers', () => {
  describe('isTimestamp', () => {
    it('should properly recognize a timestamp', () => {
      expect(helpers.isTimestamp('2017-04-25')).to.eql(true);
    });
  });
});
