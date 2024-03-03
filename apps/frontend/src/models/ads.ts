export interface IAd {
  city_name: string;
  created_at: string;
  description: string;
  district_name: string;
  id: number;
  images: {
    id: number;
    image: string;
    thumbnail: string;
    user: number;
  }[];
  price: number;
  title: string;
  user: number;
  views: number;
}

export interface IAdsData {
  page: number;
  pageSize: number;
  results: IAd[];
  total: number;
}
