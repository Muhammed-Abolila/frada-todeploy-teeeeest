import TrackOrdersAccordion from "./trackOrdersAtoms/trackOrdersAccordion/TrackOrdersAccordion";
import DashboardPageTitle from "../../dashboardComponents/utilities/dashboardPageTitle/DashboardPageTitle";
import { getUserOrders } from "./apis";
import NoProduct from "../../../../../components/Utilities/NoProduct/NoProduct";
export default async function TrackOrders() {
  const data = await getUserOrders();
  console.log("data from track orders ", data);
  return (
    <>
      {data.orders.length > 0 ? (
        <div className="px-3 xl:px-10 min-h-[100vh]">
          <DashboardPageTitle title="تتبع الطلبات" />
          <div className="flex flex-col gap-8">
            {data?.orders.map(
              (order, index) =>
                order.progressPercentage !== "100%" && (
                  <TrackOrdersAccordion
                    order={order}
                    user={data?.user}
                    key={index}
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <NoProduct text="لا توجد طلبات" />
      )}
    </>
  );
}
