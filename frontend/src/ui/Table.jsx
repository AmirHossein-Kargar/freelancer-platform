// Main table wrapper component with responsive overflow
function Table({ children }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-secondary-800 border-2 border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm">{children}</table>
        </div>
    )
}

// Table header section with background styling
function TableHeader({ children }) {
    return <thead className="bg-secondary-50 dark:bg-secondary-700 border-b-2 border-secondary-300 dark:border-secondary-600">{children}</thead>
}

// Table body with row dividers
function TableBody({ children }) {
    return <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">{children}</tbody>
}

// Individual table row with optional custom styling
function TableRow({ children, className = "" }) {
    return <tr className={`border-b border-secondary-200 dark:border-secondary-700 ${className}`}>{children}</tr>
}

// Table header cell with RTL text alignment and styling
function TableHeaderCell({ children, className = "" }) {
    return (
        <th className={`px-4 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider border-b-2 border-r border-secondary-300 dark:border-secondary-600 ${className}`}>
            {children}
        </th>
    )
}

// Standard table cell with padding and no-wrap text
function TableCell({ children, className = "" }) {
    return (
        <td className={`px-4 py-4 whitespace-nowrap border-r border-secondary-200 dark:border-secondary-700 ${className}`}>
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