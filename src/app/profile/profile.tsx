import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
     
      <div className="flex items-center space-x-2 mb-4">
        <ArrowLeft className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500">Home</span>
      </div>
      
     
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-4xl "><img className="rounded-full" src="/profile.jpg" /></span>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">Micheal Scofield</h2>
        <p className="text-gray-600 text-sm mt-2">
          Software Engineer @Spotify by Day, <br />
          Blogger & Podcaster by Night, <br />
          Toronto Raptors Die Hard Fan
        </p>
      </Card>
      
     
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Books</h3>
        
        <div className="mt-4 space-y-4">
         
          <Card className="flex items-center p-4 space-x-4">
            <img src="/book1.jpg" alt="This is Marketing" className="w-16 h-24 rounded" />
            <div>
              <h4 className="font-bold">This is Marketing</h4>
              <p className="text-sm text-gray-500">Seth Godin</p>
              <p className="text-xs text-gray-600">Making Smarter Decisions When you Don’t Have All The Facts</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "38%" }}></div>
              </div>
            </div>
          </Card>
          
        
          <Card className="flex items-center p-4 space-x-4">
            <img src="/book2.jpg" alt="The Icarus Deception" className="w-16 h-24 rounded" />
            <div>
              <h4 className="font-bold">The Icarus Deception</h4>
              <p className="text-sm text-gray-500">Seth Godin</p>
              <p className="text-xs text-gray-600">Making Smarter Decisions When you Don’t Have All The Facts</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "63%" }}></div>
              </div>
            </div>
          </Card>

          <Card className="flex items-center p-4 space-x-4">
            <img src="/book3.jpg" alt="The Icarus Deception" className="w-16 h-24 rounded" />
            <div>
              <h4 className="font-bold">The Icarus Deception</h4>
              <p className="text-sm text-gray-500">Seth Godin</p>
              <p className="text-xs text-gray-600">Making Smarter Decisions When you Don’t Have All The Facts</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "63%" }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}