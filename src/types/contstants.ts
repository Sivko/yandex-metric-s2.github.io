export interface ContastantRoot {
  id: string
  type: string
  links: Links
  attributes: Attributes
  relationships: Relationships
}

export interface Links {
  self: string
}

export interface Attributes {
  "created-at": string
  "updated-at": string
  "cached-at": string
  name: string
  value: string
  numeric: boolean
}

export interface Relationships {
  category: Category
}

export interface Category {
  links: Links2
}

export interface Links2 {
  self: string
  related: string
}
