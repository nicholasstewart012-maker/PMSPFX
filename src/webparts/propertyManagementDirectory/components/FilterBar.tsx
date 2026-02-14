import * as React from 'react';
import { Stack, Dropdown, IDropdownOption, SearchBox, DefaultButton, IStackTokens } from '@fluentui/react';
import { ILocation } from '../../../models/ILocation';

interface IFilterBarProps {
    locations: ILocation[];
    selectedState: string | undefined;
    selectedBranch: string | undefined;
    onStateChange: (state: string | undefined) => void;
    onBranchChange: (branch: string | undefined) => void;
    onSearchChange: (text: string) => void;
    onClear: () => void;
}

const stackTokens: IStackTokens = { childrenGap: 15 };

export const FilterBar: React.FunctionComponent<IFilterBarProps> = (props) => {
    const { locations, selectedState, selectedBranch, onStateChange, onBranchChange, onSearchChange, onClear } = props;

    // Derive unique states
    const stateOptions: IDropdownOption[] = React.useMemo(() => {
        const states = Array.from(new Set(locations.map(l => l.State))).sort();
        return states.map(s => ({ key: s, text: s }));
    }, [locations]);

    // Derive branches based on selected State
    const branchOptions: IDropdownOption[] = React.useMemo(() => {
        let filtered = locations;
        if (selectedState) {
            filtered = locations.filter(l => l.State === selectedState);
        }
        const branches = Array.from(new Set(filtered.map(l => l.Branch))).sort();
        return branches.map(b => ({ key: b, text: b }));
    }, [locations, selectedState]);

    return (
        <Stack horizontal tokens={stackTokens} verticalAlign="end" wrap>
            <Dropdown
                label="State"
                selectedKey={selectedState}
                onChange={(e, option) => onStateChange(option ? option.key as string : undefined)}
                placeholder="Filter by State"
                options={stateOptions}
                styles={{ root: { minWidth: 150 } }}
            />
            <Dropdown
                label="Branch"
                selectedKey={selectedBranch}
                onChange={(e, option) => onBranchChange(option ? option.key as string : undefined)}
                placeholder="Filter by Branch"
                options={branchOptions}
                disabled={!selectedState} // Optional: disable if no state selected? Or allow listing all branches?
                // Requirement: "Branch dropdown (dependent on selected State)".
                // I will keep it enabled but it shows all branches if no state selected, or I can disable it.
                // Let's keep it enabled but contextual.
                styles={{ root: { minWidth: 200 } }}
            />
            <SearchBox
                placeholder="Search..."
                onChange={(e, newValue) => onSearchChange(newValue || '')}
                styles={{ root: { minWidth: 300 } }}
            />
            <DefaultButton text="Clear Filters" onClick={onClear} />
        </Stack>
    );
};
