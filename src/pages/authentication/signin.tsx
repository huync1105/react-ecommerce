import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import authenApi from "../../api/authenApi";
import { UserContext } from "../../App";
import SignBtn from "../../components/button/SignBtn";
import Inputtext from "../../components/input/inputtext";
import { handleHttpResponse } from "../../shared/function/globalfunction";

export default function SignIn(props: any) {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { setLoading, toast }: any = useOutletContext();
  const {userVal, setUserVal}: any = useContext(UserContext);

  const signIn = () => {
    setLoading(true);
    const fetchLogin = async () => {
      try {
        const response: any = await authenApi().login(user);
        handleHttpResponse(response, toast, () => {
          setLoading(false);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("e_id_client", response.data.userInfo._id);
          setUserVal(response.data.userInfo);
          setTimeout(() => {
            navigate("home");
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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold my-3">Hello bạn!</h1>
      <p className="my-3 text-center">
        Đăng nhập vào để dùng đầy đủ chức năng nhé ^^
      </p>
      <div className="w-full my-2">
        <Inputtext
          inputPlaceholder="Email"
          handleChange={(e: any) => {
            setUser({ ...user, email: e.target.value });
          }}
          handleOnKeyUp={(e: any) => {
            if (e.key === 'Enter') {
              signIn();
            }
          }}
        />
        <Inputtext
          inputPlaceholder="Password"
          isPassword={true}
          handleChange={(e: any) => {
            setUser({ ...user, password: e.target.value });
          }}
          handleOnKeyUp={(e: any) => {
            if (e.key === 'Enter') {
              signIn();
            }
          }}
        />
      </div>
      <SignBtn
        className="w-full my-2"
        btnTitle="Sign In"
        btnClassName="bg-sign-light-brown text-sign-dark-brown"
        handleBtnClick={signIn}
      />
      <p className="my-2">Or</p>
      <SignBtn
        className="my-2"
        btnTitle="Sign Up"
        btnClassName="bg-sign-light-green text-sign-dark-green"
        handleBtnClick={() => {
          navigate("/sign-up");
        }}
      />
    </div>
  );
}
