export const Footer = () => {
    return (
      <div>
        <div className="bg-amber-400">
          <div className="text-2xl font-extrabold bg-amber-100 flex justify-center pt-5">
            <h1>Boox</h1>
          </div>
  
          <div className=" flex-wrap gap-7 mt-7 mx-auto max-w-screen-lg w-[25%] ">
            <div className="w-full sm:w-1/2 md:w-1/4 ">
              <p className="text-xl font-bold mt-9">About   </p>
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

          <div className="bg-amber-900 pt-9 ">
            <div className="flex justify-center  gap-5">
            <div className="w-[40px] h-[40px] bg-blue-600 rounded-full ">
              <link rel="" href="https://www.facebook.com/" />
            </div>
            <div className="w-[40px] h-[40px] bg-pink-600 rounded-full ">
              <link rel="stylesheet" href="https://www.instagram.com/" />
            </div>
            <div className="w-[40px] h-[40px] bg-blue-400 rounded-full ">
              <link rel="stylesheet" href="https://www.twitter.com/" />
            </div>
            </div>

          <p className="flex justify-center mt-4 text-white">© 2025 All rights reserved. </p>
          <p className="flex justify-center mt-4 text-white">© 2025 All rights reserved. </p>


          </div>
        </div>
      </div>
    );
  };
  
