import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export const Footer = () => {
    return (
      <div className="bg-gray-100">
        <div>
            <h1 className="text-4xl font-extrabold  flex justify-center pt-10">Boox</h1>
          <div className="bg-gray-100">
          <div>
            <p className="font-bold text-lg mt-[30px] flex justify-center">About</p>
            <div className="flex justify-center text-black opacity-60 ">
              About us <br/> Contact us <br/> Blog
            </div>
           </div>
           <div>
            <p className="font-bold text-lg mt-[30px] flex justify-center">Support</p>
            <div className="flex justify-center text-black opacity-60">
              FAQs <br/> Privacy Policy <br/> Request a Book <br /> Terms & Conditions
            </div>
           </div>
           <div>
            <p className="font-bold text-lg mt-[30px] flex justify-center">Menu  </p>
            <div className="flex justify-center text-black opacity-60">
              Home <br/> Books <br/> sCategories
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

           <p className="flex justify-center mt-4 text-gray-500">© 2025 All rights reserved. </p>
           </div>
        </div>
      </div>
    );
  };
  
