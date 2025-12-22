import { Link } from "react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-10">
      {/* Left */}
      <div className="flex justify-center w-7/10 p-5">
        <p className="text-gray-600">
          © 2020 Flowbase. Powered by{" "}
          <span className="text-orange-400">Webflow</span>
          {" · "}
          <Link
            to="/admin/recipes"
            className="text-blue-600 hover:text-blue-800 font-medium ml-2"
          >
            Admin
          </Link>
        </p>
      </div>

      {/* Right */}
      <div className="flex justify-center items-center gap-5 p-5 w-3/10">
        <a href="#" aria-label="Facebook">
          <Facebook />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram />
        </a>
        <a href="#" aria-label="Twitter">
          <Twitter />
        </a>
      </div>
    </footer>
  );
};

