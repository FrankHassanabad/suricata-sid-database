import * as fs from 'fs';
import * as util from 'util';
import { readRule } from './readrule';
import { referenceConf } from './referenceconf';

const readDir = util.promisify(fs.readdir);

const REFERENCE_CONF = '/usr/local/etc/suricata/rules/reference.config';
const RULES_DIR = '/usr/local/etc/suricata/rules';

const refMap = referenceConf(REFERENCE_CONF);

readDir(RULES_DIR)
  .then(items => items.filter(item => item.endsWith('.rules')))
  .then(rulesFiltered => {
    const initalValue: Record<string, string[]> = {};
    const allRules = rulesFiltered.reduce((accum, rule) => {
      const sidsWithRefs = readRule(`${RULES_DIR}/${rule}`, refMap);
      accum = { ...accum, ...sidsWithRefs };
      return accum;
    }, initalValue);
    return allRules;
  })
  .then(allRules => {
    fs.writeFileSync(
      'data/suricata-rules-ref.json',
      JSON.stringify(allRules, null, 2),
    );
  });
