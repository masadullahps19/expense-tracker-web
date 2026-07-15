"use client";

export const IncomeTable = ({ data }: { data: any[] }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Date</th>
          <th className="text-left py-2">Description</th>
          <th className="text-left py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((income) => (
          <tr key={income.id} className="border-b">
            <td className="py-2">{new Date(income.transactionDate).toLocaleDateString()}</td>
            <td className="py-2">{income.description}</td>
            <td className="py-2">${(income.amount / 100).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};