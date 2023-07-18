import { UserSession } from './user.model';

export type OperationType = 'read' | 'create' | 'edit' | 'delete';

export const enum Operation {
  READ = 'read',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
}

export const OPERATION_TYPES: OperationType[] = [Operation.CREATE, Operation.READ, Operation.EDIT, Operation.DELETE];

export interface CreatedByUser {
  id: number;
  userName: string;
  fullName: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  isActive?: boolean;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface Denomination {
  id: number;
  currency: Currency;
  denomination: number;
  isActive: boolean;
}

export interface ContactType {
  id: number;
  name: string;
}
export interface ItemType {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  abbreviation: string;
  areaCode: string;
}
export interface Brand {
  id: number;
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface ItemUnit {
  id: number;
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface Supplier {
  id: number;
  code?: string;
  name: string;
  abbreviation: string;
  isActive?: boolean;
}

export interface Item {
  id: number;
  parent?: Item;
  name: string;
  category?: Category;
  description: string;
  image?: string;
  sku: string;
  barcode: string;
  minInStock?: number;
  color?: string;
  price?: PriceScheme;
  listOrder?: number;
  type?: ItemType;
  unit?: ItemUnit;
  unitValue?: number;
  supplier?: Supplier;
  brand?: Brand;
  width?: number;
  weight?: number;
  height?: number;
  depth?: number;
  isComposed?: boolean;
  isTrackable?: boolean;
  isTaxable?: boolean;
  isActive: boolean;
}

export interface ItemMod {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Modifier {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Component {
  id: number;
  name: string;
  isActive: boolean;
}

export interface PriceScheme {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  description: string;
  isActive?: boolean;
}

export interface PaymentMode {
  id: number;
  mode: string;
}

export interface Workstation {
  id: number;
  name: string;
  macAddress: string;
  isActive: boolean;
}

export interface Session {
  id: number;
  openDate?: string;
  closeDate?: string;
  isPosed?: boolean;
}

export interface Customer {
  id: number;
  code?: string;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
}

export interface InvoiceType {
  id: number;
  typeName: string;
  isActive: boolean;
}

export interface Rates {
  rate: number;
  rateText: string;
  timestamp: number;
}

export interface Till {
  userId: UserSession;
  sessionId: number;
  workstationId: Workstation;
  Date: string;
  startTime: string;
  endTime: string;
}

export interface Inventory {
  warehouse: Warehouse;
  item: Item;
  quantity: number;
  cost: number;
  taxPU: number;
  discountPU: number;
  sales: number;
  taxSA: number;
  discountSA: number;
}

export interface Bill {
  id: number;
  invoiceNo: string;
  supp: Supplier;
  date: number;
  dueDate: number;
  amount: number;
  isTaxable: boolean;
  tax: number;
  discountType: string;
  discount: number;
  curr?: Currency;
  exchangeRate: number;
  taxExchangeRate: number;
  isApproved: boolean;
  approvedDate: number;
  isReceived: boolean;
  receivedDate: number;
  isPaid: boolean;
  paidDate: number;
  isPosted: boolean;
  postedDate: number;
  notes: string;
}

export interface Sale {
  id: number;
  invoiceNo: string;
  currency?: Currency;
  session?: Session;
  workstation?: Workstation;
  warehouse?: Warehouse;
  customer: Customer;
  paymentMode?: PaymentMode;
  invoiceType?: InvoiceType;
  date: number;
  dueDate: number;
  amount: number;
  amountText?: string;
  isTaxable?: boolean;
  tax?: number;
  discountType?: string;
  discount?: number;
  exchangeRate?: number;
  taxExchangeRate?: number;
  isApproved?: boolean;
  approvedDate?: number;
  isDelivered?: boolean;
  deliveredDate?: number;
  isPaid?: boolean;
  paidDate?: number;
  isPosted?: boolean;
  postedDate?: number;
  onHold?: boolean;
  onHoldDate?: number;
  isVoid?: boolean;
  voidReason?: string;
  voidDate?: number;
  notes?: string;
}
