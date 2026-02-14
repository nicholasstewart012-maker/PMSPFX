import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Stack, Text, Link, Spinner, SpinnerSize, PrimaryButton, DefaultButton } from '@fluentui/react';

// Configure worker to load from CDN to avoid build configuration complexity in SPFx
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface IBlueprintViewerProps {
    fileUrl: string | undefined;
}

export const BlueprintViewer: React.FunctionComponent<IBlueprintViewerProps> = (props) => {
    const { fileUrl } = props;
    const [numPages, setNumPages] = React.useState<number | null>(null);
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    React.useEffect(() => {
        setPageNumber(1);
    }, [fileUrl]);

    if (!fileUrl) {
        return <Text>No blueprint uploaded.</Text>;
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <Stack tokens={{ childrenGap: 15 }} horizontalAlign="center">
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <DefaultButton disabled={pageNumber <= 1} onClick={() => setPageNumber(prev => prev - 1)} text="Previous" />
                <Text variant="mediumPlus" style={{ alignSelf: 'center' }}>
                    Page {pageNumber} {numPages ? `of ${numPages}` : ''}
                </Text>
                <DefaultButton disabled={numPages === null || pageNumber >= numPages} onClick={() => setPageNumber(prev => prev + 1)} text="Next" />
            </Stack>

            <div style={{ border: '1px solid #ccc', maxHeight: '500px', overflow: 'auto', padding: 10 }}>
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Spinner size={SpinnerSize.large} label="Loading Blueprint..." />}
                    error={<Text color="red">Failed to load PDF. It might be blocked by CORS or missing.</Text>}
                >
                    <Page pageNumber={pageNumber} width={500} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            </div>

            <Link href={fileUrl} target="_blank" download>
                <PrimaryButton text="Download / Open in New Tab" />
            </Link>
        </Stack>
    );
};
