export interface PublicKey {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
  }

export interface PublicKeys {
    keys: PublicKey[];
  }