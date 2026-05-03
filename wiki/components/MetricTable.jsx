export default function MetricTable({ headers, rows, bestValues = {} }) {
  return (
    <div className="overflow-x-auto my-6 border border-border-primary rounded-lg shadow-sm bg-card">
      <table className="min-w-full divide-y divide-border-primary text-sm">
        <thead className="bg-sidebar">
          <tr>
            {headers.map((header, i) => (
              <th 
                key={i} 
                scope="col" 
                className="px-6 py-4 text-left font-semibold text-foreground uppercase tracking-wider text-xs"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-primary">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-foreground/5 transition-colors">
              {row.map((cell, cellIndex) => {
                // If there's a best value for this column index, highlight it
                const isBest = bestValues[cellIndex] === cell;
                
                return (
                  <td 
                    key={cellIndex} 
                    className={`px-6 py-4 whitespace-nowrap transition-colors ${
                      isBest 
                        ? 'bg-green-500/10 font-bold text-green-600 dark:text-green-400' 
                        : 'text-foreground/80'
                    } ${cellIndex === 0 ? 'font-semibold text-foreground' : ''}`}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
