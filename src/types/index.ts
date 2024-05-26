export type Maybe<T> = T | null;

export type Translation = {
  locale: string;
  title: string;
  description: string;
  mediaId?: number;
  mediaType?: string;
};

export type TabItem = {
  key: string;
  name: string;
  path: string;
  isActive?: boolean;
};

export type Tab = TabItem[];

export interface CardVerticalBaseOptions {
  title?: Maybe<string>;
  coverImage?: {
    image?: Maybe<string>;
    color?: Maybe<string>;
    alt?: Maybe<string>;
  };
  bannerImage?: Maybe<string>;
}

export interface CardMediaVerticalOptions extends CardVerticalBaseOptions {
  id: number;
  to: string;
  isRanking?: boolean;
  index?: number;
  subDescription?: string;
}

export interface CardCharactersVerticalOptions extends CardVerticalBaseOptions {
  id: number;
  to: string;
}

export interface CardStaffVerticalOptions extends CardVerticalBaseOptions {
  id: number;
  to: string;
}

export interface ModalOptions {
  image: string;
  id: number;
  name: string;
  isBack?: boolean;
}

export interface MediaDetailsModal extends ModalOptions {
  bannerImage?: string;
  href: string;
}
export interface CharacterDetailsModal extends ModalOptions {}
export interface StaffDetailsModal extends ModalOptions {}

export enum DetailsModalStackTypes {
  Media,
  Character,
  Staff,
}
export interface DetailsModalStack {
  type: DetailsModalStackTypes;
  value: MediaDetailsModal | CharacterDetailsModal | StaffDetailsModal;
}

export interface Menu {
  title: string;
  routeId: string;
  path: string;
  icon: string;
  iconActivated: string;
  isActive?: boolean;
}