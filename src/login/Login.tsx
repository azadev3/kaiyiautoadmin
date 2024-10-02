import React, { ChangeEvent } from "react";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../Baseurl";
import { toast, ToastContainer, Zoom } from "react-toastify";
import Loader from "../Loader";
import { useRecoilState } from "recoil";
import { IsAuthState } from "../recoil/atoms";

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [_, setIsAuth] = useRecoilState(IsAuthState);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${endpoint}/login`, data);

      if (response.data && response.status === 200) {
        toast.success("Giriş uğurludur! Yönləndirilirsiniz...", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
        });
        const token = response.data?.token;

        localStorage.setItem("kaiyi_adm_token", token);
        setIsAuth(true);
        navigate("/", { replace: true });
      } else {
        console.log(response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Email və Şifrə vacibdir!", {
            position: "top-center",
            style: { backgroundColor: "black", color: "white" },
          });
        } else if (error.response?.status === 404) {
          toast.error("İstifadəçi tapılmadı.", {
            position: "top-center",
            style: { backgroundColor: "black", color: "white" },
          });
        } else if (error.response?.status === 401) {
          toast.error("Şifrə yanlışdır.", {
            position: "top-center",
            style: { backgroundColor: "black", color: "white" },
          });
        } else if (error.response?.status === 500) {
          toast.warn("Serverlə bağlı problem!", {
            position: "top-center",
            style: { backgroundColor: "black", color: "white" },
          });
        }
      }
      console.log(error);
    } finally {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  };

  return (
    <main className="login-area">
      <ToastContainer transition={Zoom} autoClose={2000} pauseOnHover={false} />
      <h1>
        <Link target="_blank" to="http://www.kaiyiauto.com/">
          Kaiyi AUTO
        </Link>
        Admin Panel
      </h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="flex-column-container">
          <div className="input-field">
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <svg fill="white" height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_3" data-name="Layer 3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input
                value={email}
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                type="text"
                className="input"
                placeholder="Sizə verilən Elektron poçtu daxil edin*"
              />
            </div>
          </div>

          <div className="input-field">
            <div className="flex-column">
              <label>Şifrə</label>
            </div>
            <div className="inputForm">
              <svg fill="white" height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                value={password}
                name="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                type="password"
                className="input"
                placeholder="Sizə verilən şifrəni daxil edin*"
              />
            </div>
          </div>
        </div>

        <button className={`button-submit ${loading ? "button-loading" : ""}`} disabled={loading}>
          {loading ? <Loader /> : "Daxil ol"}
        </button>
        <p className="p">
          Problemlə üzləşmisiniz?
          <Link style={{ textDecoration: "none" }} target="_blank" to="https://166tech.az/elaqe" className="span">
            Saytdan əlaqə yaradın
          </Link>
        </p>
        <p className="p line">və ya</p>

        <div className="flex-row">
          <Link target="_blank" to="https://www.instagram.com/166tech.az/" className="btn google">
            <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)" />
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)" />
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)" />
              <path
                d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                fill="white"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                  <stop stop-color="#B13589" />
                  <stop offset="0.79309" stop-color="#C62F94" />
                  <stop offset="1" stop-color="#8A3AC8" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                  <stop stop-color="#E0E8B7" />
                  <stop offset="0.444662" stop-color="#FB8A2E" />
                  <stop offset="0.71474" stop-color="#E2425C" />
                  <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                  <stop offset="0.156701" stop-color="#406ADC" />
                  <stop offset="0.467799" stop-color="#6A45BE" />
                  <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
                </radialGradient>
              </defs>
            </svg>
            Instagram
          </Link>
          <Link to={`tel:${"+994502247300"}`} className="btn apple">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <title>Whatsapp-color</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
                  <path
                    d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z"
                    id="Whatsapp"></path>
                </g>
              </g>
            </svg>
            WhatsApp
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
