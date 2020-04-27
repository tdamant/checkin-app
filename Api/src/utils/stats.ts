export const getMedian = (numbers: number[]): number => {
  const ordered = numbers.sort((a,b) => a - b);
  const length = ordered.length;
  const oddLength = length % 2 !== 0;
  if(oddLength) {
    const index = ((length + 1) / 2) - 1;
    return ordered[index]
  }
  const index = (length / 2) -1;
  const [lower, upper] = ordered.slice(index, index + 2);
  return (lower + upper) / 2
};
