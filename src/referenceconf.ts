import * as fs from 'fs';

type StringRecord = Record<string, string>;

export const referenceConf = (referenceConfig: string) => {
  const reference = fs
    .readFileSync(referenceConfig)
    .toString()
    .split('\n');

  const filteredRef = reference.filter(line => !line.trim().startsWith('#'));
  const initialValue: StringRecord = {};
  const finalAccum = filteredRef.reduce((accum, line) => {
    const match = /config reference:\s+(\w+)\s+(.+)/g.exec(line);
    if (match != null) {
      const name = match[1].trim();
      const value = match[2].trim();
      accum[name] = value;
    }
    return accum;
  }, initialValue);
  return finalAccum;
};
