/* eslint-disable */
import { addEmptyDays, getDate } from './getDateUtil';
import { addEmptyDaysInput, addEmptyDaysOutput } from './getDateUtil.mock';

describe('getDateUtil', () => {
  describe('getDate', () => {
    it(`should return expected date from '1382432573'`, () => {
      const testInput = getDate('1382432573');
      const testOutput = 'Tuesday, October 22, 2013';
      expect(testInput).toEqual(testOutput);
    });
  });
  describe('addEmptyDays', () => {
    it(`should return an object with missing days as { '2012-12-12: 0 }`, () => {
      const testInput = addEmptyDays({ dayList: addEmptyDaysInput });
      const testOutput = addEmptyDaysOutput;
      expect(testInput).toEqual(testOutput);
    });
  });
});
