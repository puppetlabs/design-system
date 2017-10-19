import { expect } from 'chai';
import moment from 'moment';
import helpers from '../../source/js/helpers/charting';

describe('helpers', () => {
  describe('isTimestamp', () => {
    it('should properly recognize a timestamp', () => {
      expect(helpers.isTimestamp('2017-04-25')).to.eql(true);
    });
  });

  describe('validatedNumber', () => {
    it('should not parse a string that is not a number to an int', () => {
      expect(helpers.validatedNumber('this is not a number')).to.eql(NaN);
    });

    it('should properly parse a string integer into an int', () => {
      expect(helpers.validatedNumber('1')).to.eql(1);
    });

    it('should properly parse a string float into a float', () => {
      expect(helpers.validatedNumber('1.1')).to.eql(1.1);
    });
  });

  describe('isInt', () => {
    it('should properly recognize a string integer as an int', () => {
      expect(helpers.isInt('1')).to.eql(true);
      expect(helpers.isInt('1.1')).to.eql(false);
    });

    it('should properly recognize an integer as an int', () => {
      expect(helpers.isInt(1)).to.eql(true);
      expect(helpers.isInt(1.1)).to.eql(false);
    });
  });

  describe('isFloat', () => {
    it('should properly recognize a string float as an float', () => {
      expect(helpers.isFloat('1')).to.eql(false);
      expect(helpers.isFloat('1.1')).to.eql(true);
    });

    it('should properly recognize a float as float', () => {
      expect(helpers.isFloat(1)).to.eql(false);
      expect(helpers.isFloat(1.1)).to.eql(true);
    });
  });

  describe('detectCategoryType', () => {
    it('should properly detect moment dates as date', () => {
      const categories = [moment()];

      expect(helpers.detectCategoryType(categories)).to.eql('date');
    });

    it('should properly detect date objects as date', () => {
      const categories = [new Date()];

      expect(helpers.detectCategoryType(categories)).to.eql('date');
    });

    it('should properly detect date strings as date', () => {
      const categories = ['2017-01-01'];

      expect(helpers.detectCategoryType(categories)).to.eql('date');
    });

    it('should properly detect integer strings as number', () => {
      const categories = ['1', '2', '3'];

      expect(helpers.detectCategoryType(categories)).to.eql('number');
    });

    it('should properly detect integers as number', () => {
      const categories = [1, 2, 3];

      expect(helpers.detectCategoryType(categories)).to.eql('number');
    });

    it('should properly detect floats as number', () => {
      const categories = [1.1, 2.2, 3.3];

      expect(helpers.detectCategoryType(categories)).to.eql('number');
    });

    it('should properly detect strings as ordinal', () => {
      const categories = ['alex', 'brad', 'colby'];

      expect(helpers.detectCategoryType(categories)).to.eql('ordinal');
    });
  });
});
