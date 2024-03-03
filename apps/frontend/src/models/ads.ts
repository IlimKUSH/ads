export interface Image {
  id: number;
  image: string;
  thumbnail: string;
  user: number;
}
export interface IAd {
  city_name: string;
  created_at: string;
  description: string;
  district_name: string;
  id: number;
  images: Image[];
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
