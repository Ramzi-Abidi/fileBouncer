import { fileTypeFromBuffer } from "file-type";

export interface DetectedType {
  mime: string;
  ext: string;
}

/**
 * Detect the file type from the start of a buffer (file signature).
 * Returns undefined when the type is unknown (e.g. plain text, empty).
 */
export async function detectType(buffer: Buffer): Promise<DetectedType | undefined> {
  const result = await fileTypeFromBuffer(buffer);
  if (!result) {
    return undefined;
  }
  return { mime: result.mime, ext: result.ext };
}
