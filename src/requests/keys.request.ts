export type CreateKeyRequest = {
  customerId: number;
  period: number;
};

export type ActivateKeyRequest = {
  key: string;
};

export type DeactivateKeyRequest = {
  key: string;
};

export type GetEncryptedKeyRequest = {
  key: string;
  iv: string;
  licenseKey: string;
};
