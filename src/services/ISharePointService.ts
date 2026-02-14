import { ILocation } from '../models/ILocation';

export interface ISharePointService {
    getAllLocations(): Promise<ILocation[]>;
}
