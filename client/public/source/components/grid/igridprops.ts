export interface IGridProps {
    data: any[];
    totalPageCount: number;
    currentPageNum: number;
    columns: {
        name: string;
        displayName: string;
    }[],
    onPageNumChanged?: (n: number) => void,
    onCountPerPageChanged?: (n: number) => void,
    fetching?: boolean,
    onEditClick?:(data:any) => void,
    onDeleteClick?:(data:any) => void
}