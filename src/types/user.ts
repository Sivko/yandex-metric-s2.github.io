export interface UserRootInterface {
  data: Data2;
  included: Included[];
}

export interface Included {
  id: string;
  type: string;
  attributes: Attributes2;
}

export interface Attributes2 {
  'created-at': string;
  'updated-at': string;
  'cached-at': string;
  'company-name': string;
  'time-zone': string;
  'logo-url'?: any;
  locale: string;
  'country-code': string;
  'custom-fields-limit': number;
}

export interface Data2 {
  id: string;
  type: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Relationships {
  account: Account;
  'work-position': Workposition;
  'custom-role': Workposition;
  'user-group': Workposition;
  documents: Workposition;
  'document-template-renders': Workposition;
  'diary-time-trackings': Workposition;
}

export interface Workposition {
  links: Links2;
}

export interface Account {
  links: Links2;
  data: Data;
}

export interface Data {
  type: string;
  id: string;
}

export interface Links2 {
  self: string;
  related: string;
}

export interface Attributes {
  'created-at': string;
  'updated-at': string;
  'cached-at': string;
  email: string;
  'first-name': string;
  'last-name': string;
  'middle-name': string;
  phone: string;
  customs: Customs;
  'mail-signature': string;
  'rights-config': Rightsconfig;
  disabled: boolean;
  role: string;
  'nav-menu-config': Navmenuconfig;
  telegram: string;
  'account-id': number;
  avatar: string;
  'last-sign-in-at': string;
  'current-sign-in-at': string;
  'unconfirmed-email': string;
  'web-form-token': string;
  'time-zone': string;
  locale: string;
  online: boolean;
  'notification-settings': Notificationsettings;
  'work-time-status': boolean;
  'subtree-ids': number[];
  'as-string': string;
}

export interface Notificationsettings {
  'add-performers': Addperformers;
  'change-calendar-schedule': Addperformers;
  'diarytask-completed': Addperformers;
  'incoming-call': Addperformers;
  'change-responsible': Addperformers;
  'system-update': Addperformers;
  'diarytask-expired': Addperformers;
  'new-user': Addperformers;
  'diaryevent-completed': Addperformers;
  'diaryevent-started': Addperformers;
  'new-mail': Addperformers;
  'notification-read': Addperformers;
  'scenario-notify': Addperformers;
  comment: Addperformers;
}

export interface Addperformers {
  email: boolean;
  telegram: boolean;
  push_notification: boolean;
  browser_push_notification: boolean;
}

export interface Navmenuconfig {
}

export interface Rightsconfig {
  'work-time-tracking': string;
  'stop-other-trackings': string;
  'export-entity': string;
  'import-entity': string;
  'destroy-entity': string;
  'unbind-entity': string;
  'disable-personal-workspace': string;
  'archive-entity': string;
  'edit-menu': string;
  'edit-mail-accounts': string;
  'read-mail-accounts': string;
  'edit-entity-widgets': string;
  'edit-entity-columns': string;
  'edit-entity-nested-forms': string;
  'edit-notification-settings': string;
  'edit-table-columns': string;
  'manage-irresponsible-entity': string;
  'manage-articles': string;
  'manage-work-schedules': string;
  'allow-manual-dialing': string;
  'allow-work-with-kkm': string;
  'allow-cancel-completed-tasks': string;
  'show-account-users': string;
  'create-invoice-payment': string;
  'ignore-required-duplicates-finder-rules': string;
  'indiboards-panel-visible': string;
  'show-disabled-account-users': string;
  'show-diaries-in-timepicker': string;
  'enable-hotkeys': string;
  'do-not-disturb': string;
  'batch-edit-enable': string;
  'hidden-fields': Hiddenfields;
  'accessible-users': string[];
  'indiboards-order': string[];
  'uneditable-fields': Uneditablefields;
  'indiboards-disabled': string[];
  'indiboard-default-id': string;
  'selected-workspace-id': number;
  'accessible-user-groups': string[];
  'default-mail-account-id': number;
  'accessible-work-positions': string[];
}

export interface Uneditablefields {
  Diary: string[];
  Invoice: string[];
}

export interface Hiddenfields {
  Order: string[];
}

export interface Customs {
  'custom-110898': string;
  'custom-110899': string;
  'custom-110927': number;
  'custom-111297': string[];
  'custom-115405': string;
  'custom-115406': string;
  'custom-120314': string;
  'custom-120315': string;
}

export interface Links {
  self: string;
}