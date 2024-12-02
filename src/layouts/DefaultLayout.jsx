import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <main className={`min-h-screen flex flex-col`}>
            <div className="grow bg-background min-w-screen">
                <Outlet/>
            </div>
        </main>
    );
};

export default DefaultLayout;
