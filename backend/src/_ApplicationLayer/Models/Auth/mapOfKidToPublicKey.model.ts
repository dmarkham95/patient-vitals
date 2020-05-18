import { PublicKeyMeta } from "./publicKeyMeta.model";

export interface MapOfKidToPublicKey {
    [key: string]: PublicKeyMeta;
  }