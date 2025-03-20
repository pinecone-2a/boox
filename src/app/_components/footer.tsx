import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export const Footer = () => {
    return (
      <div>
        <div className="">
          <div className="text-2xl font-extrabold  flex justify-center pt-5">
            <h1>Boox</h1>
          </div>
  
          <div className="  gap-7 mt-7 mx-auto max-w-screen-lg w-[15%] ">
            <div className="w-full sm:w-1/2 md:w-1/4 ">
              <p className="text-xl font-bold ">About</p>
              <div className="text-[15px] opacity-60">
                <p>About us</p>
                <p>Contact us</p>
                <p>Partners</p>
                <p>Features</p>
              </div>
            </div>
  
            <div className="w-full sm:w-1/2 md:w-1/4">
              <p className="text-xl font-bold mt-9">Menu</p>
              <div className="text-[15px] opacity-60">
                <p>Home</p>
                <p>Books</p>
                <p>Collections</p>
                <p>Tags</p>
              </div>
            </div>
  
            <div className="w-full sm:w-1/2 md:w-1/4">
              <p className="text-xl font-bold mt-9">Support</p>
              <div className="text-[15px] opacity-60">
                <p>FAQs</p>
                <p>privacy policy</p>
                <p>Request a Book</p>
              </div>
            </div>
  
          </div>

<div className=" pt-9 pb-5">
<div className="flex justify-center gap-5">
  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
    <div className="w-[40px] h-[40px] bg-blue-600 rounded-full flex justify-center items-center hover:scale-110 transition duration-200"><FaFacebook />
      <i className="fab fa-facebook-f text-white"></i>
    </div>
  </a>
  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
    <div className="w-[40px] h-[40px] bg-pink-500 rounded-full flex justify-center items-center hover:scale-110 transition duration-200"><FaInstagram />
      <i className="fab fa-instagram text-white"></i>
    </div>
  </a>
  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
    <div className="w-[40px] h-[40px] bg-blue-400 rounded-full flex justify-center items-center hover:scale-110 transition duration-200"><FaTwitter />
      <i className="fab fa-twitter text-white"></i>
    </div>
  </a>
</div>

           <p className="flex justify-center mt-4 text-white">© 2025 All rights reserved. </p>


           </div>
        </div>
      </div>
    );
  };
  
