declare module 'virtual:config' {
  const Config: import('astro-pure/types').ConfigOutput
  export default Config
}

declare module '*.pdf?url' {
  const src: string
  export default src
}

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
  const workerSrc: string
  export default workerSrc
}
