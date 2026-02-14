import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react';
import { ILocation } from '../../../models/ILocation';

interface IResultsGridProps {
    items: ILocation[];
    onItemClick: (item: ILocation) => void;
}

export const ResultsGrid: React.FunctionComponent<IResultsGridProps> = (props) => {
    const { items, onItemClick } = props;

    const [columns, setColumns] = React.useState<IColumn[]>([
        { key: 'Title', name: 'Name', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'City', name: 'City', fieldName: 'City', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'State', name: 'State', fieldName: 'State', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'Branch', name: 'Branch', fieldName: 'Branch', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'Contact', name: 'Contact', fieldName: 'Contact', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'Phone', name: 'Phone', fieldName: 'Phone', minWidth: 100, maxWidth: 120, isResizable: true },
        { key: 'DistrictManager', name: 'District Manager', fieldName: 'DistrictManager', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'Modified', name: 'Modified', fieldName: 'Modified', minWidth: 100, maxWidth: 150, isResizable: true },
    ]);

    const [sortedItems, setSortedItems] = React.useState<ILocation[]>(items);

    React.useEffect(() => {
        setSortedItems(items);
    }, [items]);

    const onColumnClick = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn): void => {
        if (!column) return;
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });

        const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
        setColumns(newColumns);
        setSortedItems(newItems);
    };

    function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
        const key = columnKey as keyof T;
        return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    }

    const selection = React.useMemo(() => new Selection({
        onSelectionChanged: () => {
            const selected = selection.getSelection()[0] as ILocation;
            if (selected) {
                onItemClick(selected);
            }
        }
    }), [onItemClick]);

    return (
        <DetailsList
            items={sortedItems}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={selection}
            selectionMode={SelectionMode.single}
            onColumnHeaderClick={onColumnClick}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
        />
    );
};
