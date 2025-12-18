import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-10">
      <div className="flex justify-center  w-7/10 p-5">
        <p className="text-gray-600">
          © 2020 Flowbase. Powered by{" "}
          <span className="text-orange-400">Webflow</span>
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 p-5  w-3/10">
        <span>
          <Facebook />
        </span>
        <span>
          <Instagram />
        </span>
        <span>
          <Twitter />
        </span>
      </div>
    </footer>
  );
};
