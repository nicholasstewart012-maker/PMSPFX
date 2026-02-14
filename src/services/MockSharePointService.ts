import { ISharePointService } from './ISharePointService';
import { ILocation } from '../models/ILocation';
import { MOCK_DATA } from './MockData';

export class MockSharePointService implements ISharePointService {
    public async getAllLocations(): Promise<ILocation[]> {
        return new Promise<ILocation[]>((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA);
            }, 500);
        });
    }
}
