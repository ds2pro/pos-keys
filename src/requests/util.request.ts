export type EncryptTextRequest = {
  text: string;
  key: string;
  iv: string;
};

export type DecryptTextRequest = {
  text: string;
  key: string;
  iv: string;
};
