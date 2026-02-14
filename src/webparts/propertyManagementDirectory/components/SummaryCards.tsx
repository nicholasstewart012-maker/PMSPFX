import * as React from 'react';
import { Stack, Text, IStackStyles, ITextStyles, FontWeights } from '@fluentui/react';
import { ILocation } from '../../../models/ILocation';

interface ISummaryCardsProps {
    locations: ILocation[];
}

const cardStyles: IStackStyles = {
    root: {
        padding: 20,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: 4,
        minWidth: 200,
        flex: 1,
    },
};

const valueStyles: ITextStyles = {
    root: {
        fontSize: 24,
        fontWeight: FontWeights.semibold,
        color: '#0078d4', // Primary color
    },
};

const labelStyles: ITextStyles = {
    root: {
        fontSize: 14,
        color: '#605e5c',
    },
};

export const SummaryCards: React.FunctionComponent<ISummaryCardsProps> = (props) => {
    const { locations } = props;

    const total = locations.length;
    const active = locations.filter(l => l.Active).length;
    const states = new Set(locations.map(l => l.State)).size;
    const branches = new Set(locations.map(l => l.Branch)).size;

    return (
        <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
            <Stack styles={cardStyles}>
                <Text styles={valueStyles}>{total}</Text>
                <Text styles={labelStyles}>Total Locations</Text>
            </Stack>
            <Stack styles={cardStyles}>
                <Text styles={valueStyles}>{active}</Text>
                <Text styles={labelStyles}>Active Locations</Text>
            </Stack>
            <Stack styles={cardStyles}>
                <Text styles={valueStyles}>{states}</Text>
                <Text styles={labelStyles}>States Covered</Text>
            </Stack>
            <Stack styles={cardStyles}>
                <Text styles={valueStyles}>{branches}</Text>
                <Text styles={labelStyles}>Branches</Text>
            </Stack>
        </Stack>
    );
};
