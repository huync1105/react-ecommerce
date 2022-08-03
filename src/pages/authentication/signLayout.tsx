import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import 'react-toastify/dist/ReactToastify.css';
import "./signLayout.css";

export default function SignLayout(props: any) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="wrapper users-page w-full h-screen flex justify-center items-center">
      <div className="container mx-5 grid 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-8 sm:grid-cols-4 gap-5">
        <div className="2xl:col-start-5 xl:col-start-5 lg:col-start-3 md:col-start-3 col-span-4 bg-white rounded-2xl p-8">
          <Outlet context={{ setLoading, toast }} />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Loading isLoading={loading} />
    </div>
  );
}
