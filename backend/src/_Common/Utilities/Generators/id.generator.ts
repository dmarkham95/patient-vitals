import * as crypto from 'crypto';

type BufferEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex";


export class IdGenerator {

 public static generateRandomId(): string {
    const result = this.replaceUnsafeUrlCharacters(crypto.randomBytes(4).toString('hex'));
    return result;
  }

  private static replaceUnsafeUrlCharacters(str: string) {
    const fixed = str.replace(/[^a-zA-Z0-9-_]/g, ' ');
    const spacesCleaned = fixed.replace(/\s\s+/g, ' ');
    return spacesCleaned;
  }

}