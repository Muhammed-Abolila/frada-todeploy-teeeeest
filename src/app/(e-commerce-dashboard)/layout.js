import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import DashboardAside from "./dashboardComponents/dashboardAside/DashboardAside";
export default async function DashboardLayout({ children }) {
  return (
    <>
      <div className=" children">
        <Header />
        {children}
        <DashboardAside />
        <Footer />
      </div>
    </>
  );
}
