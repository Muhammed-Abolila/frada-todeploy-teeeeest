export default function OrderData({ title, details }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">{title}</h1>
      {details.map((detail, index) => {
        return (
          <p key={index}>
            <span>{detail.key} </span>
            <span> : </span>
            <span>{detail.value}</span>
          </p>
        );
      })}
    </div>
  );
}
