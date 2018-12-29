# suricata-sid-database

Creates a Suricata JSON hash object from the references in your local Suricata rules

# How to use this DB

Clone or download the contents of the JSON from [data/suricata-rules-ref.json](data/suricata-rules-ref.json)

Then install [jq](https://stedolan.github.io/jq/)

If you have a Suricata sid such as 2001219, run it against the JSON like so

```sh
jq '."2001219"' data/suricata-rules-ref.json
```

And your response should be several hyper links like so:

```ts
[
  'http://en.wikipedia.org/wiki/Brute_force_attack',
  'http://doc.emergingthreats.net/2001219',
];
```

or if nothing was found a `null` or if a rule was found but nothing about references a
empty array like so

```
[]
```

# How to build a new database based on rules you have

Ensure you have Suricata installed, then run

```sh
npm install
npm start
```

Look in your newly created [data/suricata-rules-ref.json](data/suricata-rules-ref.json)

If you have a different location for rules, then modify [src/builddb.ts](src/builddb.ts) at these lines:

```ts
const REFERENCE_CONF = '/usr/local/etc/suricata/rules/reference.config';
const RULES_DIR = '/usr/local/etc/suricata/rules';
```
