export type CreateCustomerRequest = {
  name: string;
  abbreviation: string;
  phone: string;
  mobile: string;
  email: string;
  isActive: boolean;
};

export type EditCustomerRequest = CreateCustomerRequest;
