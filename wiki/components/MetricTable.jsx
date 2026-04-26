export default function MetricTable({ headers, rows, bestValues = {} }) {
  return (
    <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th 
                key={i} 
                scope="col" 
                className="px-6 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, cellIndex) => {
                // If there's a best value for this column index, highlight it
                const isBest = bestValues[cellIndex] === cell;
                
                return (
                  <td 
                    key={cellIndex} 
                    className={`px-6 py-4 whitespace-nowrap ${
                      isBest 
                        ? 'bg-green-50 font-semibold text-green-800' 
                        : 'text-gray-700'
                    } ${cellIndex === 0 ? 'font-medium text-gray-900' : ''}`}
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
