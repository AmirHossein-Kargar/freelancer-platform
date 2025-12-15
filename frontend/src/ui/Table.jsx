// Main table wrapper component with responsive overflow
function Table({ children }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-secondary-0 dark:bg-secondary-800">{children}</table>
        </div>
    )
}

// Table header section with background styling
function TableHeader({ children }) {
    return <thead className="bg-secondary-50 dark:bg-secondary-900 select-none">{children}</thead>
}

// Table body with row dividers
function TableBody({ children }) {
    return <tbody className="bg-secondary-0 dark:bg-secondary-800 divide-y divide-secondary-100 dark:divide-secondary-700">{children}</tbody>
}

// Individual table row with optional custom styling
function TableRow({ children, className = "" }) {
    return <tr className={className}>{children}</tr>
}

// Table header cell with RTL text alignment and styling
function TableHeaderCell({ children, className = "" }) {
    return (
        <th className={`px-6 py-4 text-right text-xs font-semibold text-secondary-600 dark:text-secondary-300 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    )
}

// Standard table cell with padding and no-wrap text
function TableCell({ children, className = "" }) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
            {children}
        </td>
    )
}

// Attach compound components as properties
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.HeaderCell = TableHeaderCell
Table.Cell = TableCell

export default Table