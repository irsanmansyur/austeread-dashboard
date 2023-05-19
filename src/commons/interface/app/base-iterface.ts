import { ProductType } from "./product.interface";

export namespace AppInterface {
  interface baseMongo {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  export type User = baseMongo & {
    email: string;
    fullname?: string;
    lastname?: string;
    firstname?: string;
    last_name: string;
    first_name: string;
    img: string;
    password?: string;
    role: string;
    token?: string;
  };
  export type discount = {
    id: number;
    code: string;
    price: number;
    active: number;
  };
  export type Config = {
    about: string;
    advertising_opportunities: string;
    baseurl: string;
    email: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
    origin_rajaongkir: string;
    shopFooter: ShopFooter[];
  };
  export type ShopFooter = baseMongo & {
    name: string;
    value: string;
  };

  type artSort = Article[];
  export interface ArticleGroupKategoriCustom {
    category_name: string;
    articlesSort: artSort[];
  }
  export interface ArticleGroupKategori {
    category: number;
    category_name: string;
    value: Article[];
  }
  export interface Article extends baseMongo {
    title: string;
    desc: string;
    category: number | string;
    thumbnail: File | string;
    img: string;
    like: number;
    tbl_user_first_name: string;
    tbl_user_last_name: string;
    tbl_news_category_name: string;
    tbl_user: User;
    tbl_news_category: Kategori;
    creator: string;
  }
  export interface Kategori extends baseMongo {
    name: string;
    tbl_user: User;
  }
  export interface Comment extends baseMongo {
    listIdReplyComment: number;
    listIdLikes: number;
    id_person: number;
    id_news: number;
    comment: string;
    createdAt: string;
    tbl_person: {
      fullname: string;
      img: string;
    };
  }

  export interface HightLight {
    title: string;
    desc: string;
    id: string;
    createdAt: string;
    thumbnail: string;
    img: string;
    tbl_news_category: {
      name: string;
      createdAt: string;
    };
  }
  export interface HightLightWordQuery {
    id: string;
    word_query: string;
  }

  export interface questions {
    id: string;
    name: string;
    address: string;
    phone: string;
    questions: string;
    createdAt: string;
  }
  export type CategoryProduct = {
    id: string;
    name: string;
  };
  export type SubProductCategory = {
    id: string;
    category_id: string;
    name: string;
  };

  export type Order = {
    id: string;
    id_person: string;
    name: string;
    detail_address: string;
    province: number;
    city: number;
    district: number;
    postal_code: number;
    courier: string;
    service: string;
    phone: string;
    payment_method: string;
    status: string;
    receipt: string;
    discount_price: number;
    shipping_price: number;
    shipping_receipt: any | null;
    total: number;
    order: Record<string, any>;
    payment_expired: string;
    payment_fee: payment_fee;
    createdAt: string;
    updatedAt: string;
  };

  export type payment_fee = {
    fixFee: number;
    percentFee: number;
    totalFee: number;
    totalPPN: number;
  };
  export type Product = ProductType & {
    tbl_user: User;
  };
}
