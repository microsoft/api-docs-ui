declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.liquid?raw' {
  const content: string;
  export default content;
}
