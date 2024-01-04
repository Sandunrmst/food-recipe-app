import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

const Navbar = () => {
  //Access GlobalContext values
  const { searchParam, setSearchParam } = useContext(GlobalContext);
  console.log(searchParam);
  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 ">
      <h2 className="text-2xl font-semibold">
        <NavLink
          to={"/"}
          className="text-black hover:text-gray-700 duration-300"
        >
          Home
        </NavLink>
      </h2>

      <form>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Enter Item..."
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-slate-400 focus:shadow-slate-500"
        />
      </form>

      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
