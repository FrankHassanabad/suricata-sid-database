declare module '*.json' {
  const value: Readonly<Record<string, string>>;
  export default value;
}
