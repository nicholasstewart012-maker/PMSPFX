import * as React from 'react';
import styles from './PropertyManagementDirectory.module.scss';
import type { IPropertyManagementDirectoryProps } from './IPropertyManagementDirectoryProps';
import { ILocation } from '../../../models/ILocation';
import { SummaryCards } from './SummaryCards';
import { FilterBar } from './FilterBar';
import { ResultsGrid } from './ResultsGrid';
import { DetailsDrawer } from './DetailsDrawer';
import { Stack, Text, Spinner, SpinnerSize } from '@fluentui/react';

const PropertyManagementDirectory: React.FunctionComponent<IPropertyManagementDirectoryProps> = (props) => {
  const { service, listTitle } = props;

  const [locations, setLocations] = React.useState<ILocation[]>([]);
  const [filteredLocations, setFilteredLocations] = React.useState<ILocation[]>([]);

  const [selectedState, setSelectedState] = React.useState<string | undefined>(undefined);
  const [selectedBranch, setSelectedBranch] = React.useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = React.useState<ILocation | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await service.getAllLocations();
        setLocations(data);
        setFilteredLocations(data);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchData();
  }, [service, listTitle]);

  React.useEffect(() => {
    let result = locations;

    if (selectedState) {
      result = result.filter(l => l.State === selectedState);
    }

    if (selectedBranch) {
      result = result.filter(l => l.Branch === selectedBranch);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        (l.Title && l.Title.toLowerCase().indexOf(q) > -1) ||
        (l.City && l.City.toLowerCase().indexOf(q) > -1) ||
        (l.Contact && l.Contact.toLowerCase().indexOf(q) > -1) ||
        (l.DistrictManager && l.DistrictManager.toLowerCase().indexOf(q) > -1)
      );
    }

    setFilteredLocations(result);
  }, [locations, selectedState, selectedBranch, searchQuery]);

  const handleStateChange = (state: string | undefined) => {
    setSelectedState(state);
    setSelectedBranch(undefined); // Reset branch on state change
  };

  return (
    <section className={styles.propertyManagementDirectory}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack>
          <Text variant="xLarge">Property Management Locations</Text>
          <Text variant="medium">Centralized location directory</Text>
        </Stack>

        {isLoading ? (
          <Spinner size={SpinnerSize.large} label="Loading locations..." />
        ) : (
          <>
            <SummaryCards locations={filteredLocations} />

            <FilterBar
              locations={locations} // Pass all locations for option derivation
              selectedState={selectedState}
              selectedBranch={selectedBranch}
              onStateChange={handleStateChange}
              onBranchChange={setSelectedBranch}
              onSearchChange={setSearchQuery}
              onClear={() => {
                setSelectedState(undefined);
                setSelectedBranch(undefined);
                setSearchQuery('');
              }}
            />

            <ResultsGrid
              items={filteredLocations}
              onItemClick={(item) => setSelectedLocation(item)}
            />

            <DetailsDrawer
              isOpen={!!selectedLocation}
              location={selectedLocation}
              onDismiss={() => setSelectedLocation(null)}
            />
          </>
        )}
      </Stack>
    </section>
  );
};

export default PropertyManagementDirectory;
