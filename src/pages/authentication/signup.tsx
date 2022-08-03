import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import authenApi from "../../api/authenApi";
import SignBtn from "../../components/button/SignBtn";
import Inputtext from "../../components/input/inputtext";
import { handleHttpResponse } from "../../shared/function/globalfunction";

export default function SignUp(props: any) {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { setLoading, toast }: any = useOutletContext();

  const signUp = () => {
    setLoading(true);
    const fetchLogin = async () => {
      try {
        const response: any = await authenApi().register(user);
        handleHttpResponse(response, toast, () => {
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 2000)
        }, () => {
          setLoading(false);
        })
        // }
      } catch (err) {
        setLoading(false);
        toast.error(`${err}`);
      }
    };
    fetchLogin();
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold my-3">Đăng ký!</h1>
      <p className="my-3 text-center">
        Đăng ký để dùng đầy đủ chức năng nhé ^^
      </p>
      <div className="w-full my-2">
        <Inputtext
          inputPlaceholder="Email"
          handleChange={(e: any) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <Inputtext
          inputPlaceholder="Password"
          isPassword={true}
          handleChange={(e: any) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <Inputtext
          inputPlaceholder="Nhập lại Password"
          isPassword={true}
          handleChange={(e: any) => {
            setUser({ ...user, rePassword: e.target.value });
          }}
        />
      </div>
      <SignBtn
        className="my-2"
        btnTitle="Sign Up"
        btnClassName="bg-sign-light-green text-sign-dark-green"
        handleBtnClick={() => {
          signUp();
          navigate("/sign-up");
        }}
      />
    </div>
    </div>
  )
}