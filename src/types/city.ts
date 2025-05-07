export interface City {
    geoname_id: string;
    name: string;
    ascii_name: string;
    cou_name_en: string;
    population: number;
    timezone: string;
    coordinates: {
      lon: number;
      lat: number;
    };
  }
  
  export interface CitiesApiResponse {
    total_count: number;
    results: City[];
  }