import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className="xl:h-full">
      <div className="mt-[8rem]">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
