import { useState } from "react";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { profile } from "../../assets";

const SearchView = ({ onSearch }) => {
  const [open, setopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const showDropDown = () => {
    setopen(!open);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // You can add additional logic if needed
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    // <div className="flex items-center justify-between h-[70px] shadow-lg px-[22px]">
    //   <div className="flex items-center rounded-[5px] shadow-md">
    //     <input
    //       type="text"
    //       onChange={handleInputChange}
    //       value={searchQuery}
    //       name=""
    //       className="bg-[#F8F9FC h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
    //       placeholder="Search For..."
    //     />
    //     <div
    //       onClick={handleSearch}
    //       className='className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
    //     >
    //       <FaSearch color="white" />
    //     </div>
    //   </div>
    // </div>
    <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div class="md:flex">
        <div class="w-full p-3">
          <div class="relative flex">
            <input
              onChange={handleInputChange}
              value={searchQuery}
              type="text"
              class="bg-white h-14 w-full px-12 rounded-lg focus:outline-none  text-black"
              name=""
              placeholder="Search For..."
            />
            {/* <span class="absolute top-4 right-5 border-l pl-4">
              <i class="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer"></i>
            </span> */}
            <div
              onClick={handleSearch}
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              <FaSearch color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
