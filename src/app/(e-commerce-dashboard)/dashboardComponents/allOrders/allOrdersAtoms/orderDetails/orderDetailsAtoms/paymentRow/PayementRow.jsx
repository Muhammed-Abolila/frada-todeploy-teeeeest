export default function PayementRow({ columns }) {
  return (
    <tr className="border-[1px] border-solid border-orange border-collapse">
      {columns.map((td, index) => {
        return (
          <td
            key={index}
            className="p-1.5 border-[1px] border-solid border-orange border-collapse"
          >
            <span>{td.text}</span> <span>{td.price}</span> <span>ر.س</span>
          </td>
        );
      })}
    </tr>
  );
}
