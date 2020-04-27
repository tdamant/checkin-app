import {getMedian} from "./stats";
import {expect} from "chai";

describe('stats', () => {
  describe('getMedian', () => {
    it('returns median of unordered number array', () => {
      const array = [5, 4 ,99, 3, 0, -4];
      const median = getMedian(array);
      expect(median).to.eql(3.5)
    });
    it('also works with odd length arrays', () => {
      const array = [-123.4, 0, 99.2345];
      const median = getMedian(array);
      expect(median).to.eql(0)
    })
  })
});
