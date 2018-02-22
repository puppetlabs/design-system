import { expect } from 'chai';
import formatters from '../../source/js/helpers/formatters';

describe('formatters', () => {
  describe('default', () => {
    it('should properly format the value with the correct precision', () => {
      expect(formatters.default(0.5000)).to.eql('0.5');
    });

    it('should strip insignificant zeros when formatting whole numbers', () => {
      expect(formatters.default(1)).to.eql('1');
    });

    it('should properly format numbers less than 100 with the correct precision', () => {
      expect(formatters.default(100.2233)).to.eql('100.22');
    });

    it('should properly format as a summary when its a value in the thousands', () => {
      expect(formatters.default(1000.0000)).to.eql('1k');
    });

    it('should properly format as a summary when its a value in the thousands', () => {
      expect(formatters.default(1250.0000)).to.eql('1.25k');
    });

    it('should properly format as a summary when its a value in the millions', () => {
      expect(formatters.default(1000000.0000)).to.eql('1M');
    });

    it('should properly format as a summary when its a value in the millions', () => {
      expect(formatters.default(1250000.0000)).to.eql('1.25M');
    });

    it('should properly format as a summary when its a value in the billions', () => {
      expect(formatters.default(1000000000.0000)).to.eql('1B');
    });

    it('should properly format as a summary when its a value in the trillions', () => {
      expect(formatters.default(1000000000000.0000)).to.eql('1T');
    });
  });

  describe('dollar', () => {
    it('should properly format the value with the $ and at the correct precision', () => {
      expect(formatters.dollars(1000000.0000)).to.eql('$1M');
    });

    it('should properly format small values that are less than a dollar', () => {
      expect(formatters.dollars(0.05)).to.eql('$0.05');
    });
  });

  describe('numeric_percentage', () => {
    it('should properly format the value by adding a %', () => {
      expect(formatters.numeric_percentage(1)).to.eql('1%');
    });

    it('should properly format default values by adding a %', () => {
      expect(formatters.numeric_percentage(1.5)).to.eql('1.5%');
    });
  });

  describe('percentage', () => {
    it('should properly format the value by multiplying by 100 then adding a %', () => {
      expect(formatters.percentage(1)).to.eql('100%');
    });

    it('should properly format the default values by multiplying by 100 then adding a %', () => {
      expect(formatters.percentage(0.015)).to.eql('1.5%');
    });
  });
});
