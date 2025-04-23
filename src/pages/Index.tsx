
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Clicker from "@/components/Clicker";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}>
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="relative z-10 w-full max-w-md">
        <Clicker />
      </div>
    </div>
  );
};

export default Index;
