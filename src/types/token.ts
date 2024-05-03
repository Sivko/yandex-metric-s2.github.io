export interface TokenRootInterface {
  data: Data;
}

export interface Data {
  id: string;
  type: string;
  links: Links;
  attributes: Attributes;
}

export interface Attributes {
  'created-at': string;
  'updated-at': string;
  'cached-at': string;
  options: Options;
  token: string;
  'token-label': string;
  scopes: string;
  'user-id': number;
  'subscription-expires-at': string;
  'subscription-rights': Subscriptionrights;
  'master-options': Options;
}

export interface Subscriptionrights {
  price: number;
  license_included: number;
  license_count: number;
  license_price: number;
  license_min_count: number;
  default_payment_period: number;
  payment_periods: number[];
  disabled_payment_periods: any[];
  discount_map: number[][];
  api: boolean;
  scenarios: number;
  dynamic_tabs: boolean;
  document_templates: number;
  objects: number;
  sms: boolean;
  telephony: boolean;
  web_form: boolean;
  roistat: boolean;
  dadata_from_api: boolean;
  manual_scenarios_api: boolean;
  mail_count: number;
  mail_method: string;
  table_filters: number;
  custom_fields: number;
  disabled_custom_types: any[];
  storage: boolean;
  import: number;
  export: string;
  analytic: number;
  settings_copy: boolean;
  card_blocks: boolean;
  invoices: boolean;
  payments: boolean;
  entries: boolean;
  checkups: boolean;
  contracts: boolean;
  contact_groups: boolean;
  recurrence_rules: boolean;
  user_salaries: boolean;
  indiboards: number;
  org_details: number;
  telegram: boolean;
  sales_funnel: number;
  time_tracking: boolean;
  ip_security: boolean;
  custom_roles: number;
  duplicates_finder_rules: number;
  webhook_providers: boolean;
  estate_property_exporters: boolean;
  store: boolean;
  productions: boolean;
  invite_count: number;
  chat_widget: boolean;
  chat_integrations: boolean;
}

export interface Options {
}

export interface Links {
  self: string;
}