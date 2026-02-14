export interface ILocation {
  Id: number;
  Title: string; // Location Name
  State: string;
  Branch: string;
  Street: string;
  City: string;
  Zip: string;
  Country: string;
  Contact: string;
  Phone: string;
  DistrictManager: string;
  Active: boolean;
  Latitude: number;
  Longitude: number;
  BuildingSqft: number;
  LotSqft: number;
  ParkingSpots: number;
  YearBuilt: number;
  BlueprintUrl: { Description: string; Url: string } | null;
  FloorplanUrl: { Description: string; Url: string } | null;
  DocsFolderUrl: { Description: string; Url: string } | null;
  Modified: string;
}

export interface IDocument {
  Name: string;
  ServerRelativeUrl: string;
}
