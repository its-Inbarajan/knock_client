interface AdditionalDetails {
  attribute: string;
  value: string;
}

interface IListItem {
  _id?: string;
  name: string;
  description: string;
  conver_photos: string[];
  price: string;
  benefits: string[];
  additional_details: AdditionalDetails[];
  category: string;
}

export type IlistTypes = IListItem;
