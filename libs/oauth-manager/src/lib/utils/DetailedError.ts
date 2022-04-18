export type DetailedErrorExtensions = Record<string, unknown> | undefined;


export class DetailedError extends Error {
  public code: string;
  public extensions: DetailedErrorExtensions;

  constructor(
    message: string,
    code: string,
    extensions: DetailedErrorExtensions = {}
  ) {
    super(message);

    this.code = code;
    this.extensions = extensions;
  }
}
