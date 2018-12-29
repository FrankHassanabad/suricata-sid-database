import * as fs from 'fs';

export const getSidFromTokens = (tokens: string[]) =>
  tokens.reduce((accum, token) => {
    const sidMaybe = /sid:([0-9]+)/g.exec(token);
    if (sidMaybe != null) {
      return sidMaybe[1].toString();
    } else {
      return accum;
    }
  }, '');

export const getReferencesFromTokens = (
  tokens: string[],
  references: Record<string, string>,
) => {
  const initialValue: string[] = [];
  return tokens.reduce((accum, token) => {
    const ref = /reference:([\w]+),(.*);/g.exec(token);
    if (ref != null) {
      const refKeyWord = ref[1];
      const hyperLink = ref[2];
      if (references[refKeyWord]) {
        const fullLink = `${references[refKeyWord]}${hyperLink}`;
        accum = accum.concat(fullLink);
      }
    }
    return accum;
  }, initialValue);
};

export const readRule = (
  ruleFile: string,
  reference: Record<string, string>,
) => {
  const rule = fs
    .readFileSync(ruleFile)
    .toString()
    .split('\n');
  const filteredRules = rule.filter(
    line => !line.startsWith('#') && line !== '',
  );
  const initialValue: Record<string, string[]> = {};
  const sidToRefs = filteredRules.reduce((accum, line) => {
    const tokens = line.split(' ');
    const sid = getSidFromTokens(tokens);
    if (sid !== '') {
      const references = getReferencesFromTokens(tokens, reference);
      if (references.length !== 0) {
        accum[sid] = references;
      }
    }
    return accum;
  }, initialValue);
  return sidToRefs;
};
