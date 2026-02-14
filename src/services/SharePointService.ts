import { ISharePointService } from './ISharePointService';
import { ILocation } from '../models/ILocation';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { LogLevel, PnPLogging } from '@pnp/logging';

export class SharePointService implements ISharePointService {
    private _sp;
    private _listName: string;

    constructor(context: WebPartContext, listName: string) {
        this._sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
        this._listName = listName;
    }

    public async getAllLocations(): Promise<ILocation[]> {
        try {
            const items = await this._sp.web.lists.getByTitle(this._listName).items();

            return items.map((item: any) => {
                return {
                    Id: item.Id,
                    Title: item.Title,
                    State: item.State,
                    Branch: item.Branch,
                    Street: item.Street,
                    City: item.City,
                    Zip: item.Zip,
                    Country: item.Country,
                    Contact: item.Contact,
                    Phone: item.Phone,
                    DistrictManager: item.DistrictManager,
                    Active: item.Active,
                    Latitude: item.Latitude,
                    Longitude: item.Longitude,
                    BuildingSqft: item.BuildingSqft,
                    LotSqft: item.LotSqft,
                    ParkingSpots: item.ParkingSpots,
                    YearBuilt: item.YearBuilt,
                    BlueprintUrl: item.BlueprintUrl,
                    FloorplanUrl: item.FloorplanUrl,
                    DocsFolderUrl: item.DocsFolderUrl,
                    Modified: item.Modified
                };
            });
        } catch (e) {
            console.error("Error fetching locations", e);
            return [];
        }
    }
}
