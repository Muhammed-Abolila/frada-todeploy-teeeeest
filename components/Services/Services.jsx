import ContTimeDown from "./ServicesAtoms/ContTimeDown";
import Service from "./ServicesAtoms/Service";
const Services = ({offer}) => {
  return (
    <div
      className=" flex items-center lg:shadow flex-wrap mb-[20px] "
    >
      <div className="w-11/12 m-auto lg:w-full lg:flex bg-white ">
        <Service  />
        <ContTimeDown offer={offer} />
      </div>
    </div>
  );
};

export default Services;
 