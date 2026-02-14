import * as React from 'react';
import { Panel, PanelType, Pivot, PivotItem, Label, Text, Link, Stack, Separator } from '@fluentui/react';
import { ILocation } from '../../../models/ILocation';
import { BlueprintViewer } from './BlueprintViewer';

interface IDetailsDrawerProps {
    isOpen: boolean;
    location: ILocation | null;
    onDismiss: () => void;
}

export const DetailsDrawer: React.FunctionComponent<IDetailsDrawerProps> = (props) => {
    const { isOpen, location, onDismiss } = props;

    if (!location) return null;

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            type={PanelType.medium}
            headerText={location.Title}
            closeButtonAriaLabel="Close"
            isLightDismiss
        >
            <Pivot aria-label="Location Details">
                <PivotItem headerText="Overview">
                    <Stack tokens={{ childrenGap: 15 }} style={{ marginTop: 20 }}>
                        <Stack>
                            <Label>Branch</Label>
                            <Text>{location.Branch} ({location.State})</Text>
                        </Stack>
                        <Stack>
                            <Label>Complete Address</Label>
                            <Text>{location.Street}</Text>
                            <Text>{location.City}, {location.State} {location.Zip}</Text>
                            <Text>{location.Country}</Text>
                        </Stack>
                        <Separator />
                        <Stack horizontal tokens={{ childrenGap: 20 }}>
                            <Stack>
                                <Label>Contact Person</Label>
                                <Text>{location.Contact}</Text>
                            </Stack>
                            <Stack>
                                <Label>Phone</Label>
                                <Text>{location.Phone}</Text>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Label>District Manager</Label>
                            <Text>{location.DistrictManager}</Text>
                        </Stack>
                        <Separator />
                        <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
                            <Stack>
                                <Label>Building Sqft</Label>
                                <Text>{location.BuildingSqft?.toLocaleString()} sqft</Text>
                            </Stack>
                            <Stack>
                                <Label>Lot Sqft</Label>
                                <Text>{location.LotSqft?.toLocaleString()} sqft</Text>
                            </Stack>
                            <Stack>
                                <Label>Parking Spots</Label>
                                <Text>{location.ParkingSpots}</Text>
                            </Stack>
                            <Stack>
                                <Label>Year Built</Label>
                                <Text>{location.YearBuilt}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </PivotItem>

                <PivotItem headerText="Documents">
                    <Stack tokens={{ childrenGap: 15 }} style={{ marginTop: 20 }}>
                        <Label style={{ fontSize: 16 }}>Blueprint</Label>
                        {location.BlueprintUrl ? (
                            <BlueprintViewer fileUrl={location.BlueprintUrl.Url} />
                        ) : (
                            <Text>No blueprint uploaded.</Text>
                        )}

                        <Separator />

                        <Label style={{ fontSize: 16 }}>Floorplan</Label>
                        {location.FloorplanUrl ? (
                            <Link href={location.FloorplanUrl.Url} target="_blank">View Floorplan</Link>
                        ) : (
                            <Text>No floorplan available.</Text>
                        )}

                        <Separator />

                        <Label style={{ fontSize: 16 }}>All Documents</Label>
                        {location.DocsFolderUrl ? (
                            <Link href={location.DocsFolderUrl.Url} target="_blank">Open Documents Folder</Link>
                        ) : (
                            <Text>No documents folder linked.</Text>
                        )}
                    </Stack>
                </PivotItem>

                <PivotItem headerText="Map">
                    <Stack tokens={{ childrenGap: 15 }} style={{ marginTop: 20 }}>
                        <Label>Location Coordinates</Label>
                        <Text>Lat: {location.Latitude}, Long: {location.Longitude}</Text>
                        <Link
                            href={`https://www.google.com/maps/search/?api=1&query=${location.Latitude},${location.Longitude}`}
                            target="_blank"
                            style={{ fontSize: 16 }}
                        >
                            Open in Google Maps
                        </Link>
                        {/* Embed optional iframe if desired, but link is safer for quick implementation */}
                    </Stack>
                </PivotItem>
            </Pivot>
        </Panel>
    );
};
