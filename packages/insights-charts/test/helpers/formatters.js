import { expect } from 'chai';
import formatters from '../../source/js/helpers/formatters';

describe('formatters', () => {
  describe('decimal', () => {
    it('should properly format the value with the correct precision', () => {
      expect(formatters.decimal(1000000.0000)).to.eql('1000000.00');
    });
  });

  describe('dollar', () => {
    it('should properly format the value with the $ and at the correct precision', () => {
      expect(formatters.dollars(1000000.0000)).to.eql('$1M');
    });
  });

  describe('numeric', () => {
    it('should properly format with the precision of 0', () => {
      expect(formatters.numeric(1000000.0000)).to.eql('1M');
    });
  });

  describe('numeric_percentage', () => {
    it('should properly format the value by adding a %', () => {
      expect(formatters.numeric_percentage(1)).to.eql('1%');
    });
  });

  describe('numeric_percentage', () => {
    it('should properly format decimal values by adding a %', () => {
      expect(formatters.numeric_percentage(1.5)).to.eql('1.5%');
    });
  });

  describe('percentage', () => {
    it('should properly format the value by multiplying by 100 then adding a %', () => {
      expect(formatters.percentage(1)).to.eql('100%');
    });
  });

  describe('percentage', () => {
    it('should properly format the decimal values by multiplying by 100 then adding a %', () => {
      expect(formatters.percentage(0.015)).to.eql('1.5%');
    });
  });

  describe('summary', () => {
    it('should format the value with the correct precision and SI prefix', () => {
      expect(formatters.summary(1000000.000000)).to.eql('1M');
    });
  });
});
