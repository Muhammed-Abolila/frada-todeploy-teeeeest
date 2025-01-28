export default function SelectCity({ Name, register, errors, cities }) {
  return (
    <>
      <select {...register(`${Name}`, { valueAsNumber: true })}>
        <option value="" disabled>
          إختر مدينة
        </option>
        {cities?.data?.map((city, index) => {
          return (
            <option value={city.id} key={index}>
              {city?.nameAr}
            </option>
          );
        })}
      </select>
      {errors.Name && (
        <span className="text-red-600">{errors.Name.message}</span>
      )}
    </>
  );
}
