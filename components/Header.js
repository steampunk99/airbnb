import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import {useRouter} from 'next/dist/client/router'
import {format} from 'date-fns'

function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //number of guests
  const [noOfGuests, setNoOfGuests] = useState(1)

  //use next router
  const router = useRouter()

  //push search data to search page
  const search=()=>{
    router.push({
      pathname:'/search',
      query:{
        location:searchInput,
        startDate:startDate.toString(),
        endDate:endDate.toString(),
        noOfGuests
      }
    })
  }

  //SET SELECTION RANGE
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //HANDLE SELECTED DATES
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  //RESET INPUT (CANCEL BUTTON)
  const resetInput = () =>{
    setSearchInput('')
  } 

  return (
    <header className="sticky h-20 items-center top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10 transition duration-1000 ">
      {/* left */}
      <div onClick={()=> router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* middle -Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-5 flex-grow bg-transparent text-gray-600 placeholder-gray-400 outline-none"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
    {/* SEARCH ICON */}

        <SearchIcon className="mx-2 hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      {/* right */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline-flex cursor-pointer">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {/* DATE PICKER */}
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-2 ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
    <div  className=" flex items-center border-b mb-2">
          <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
          <UsersIcon className="h-5" />
          <input type="number" min={1} value={noOfGuests} onChange={(e)=> setNoOfGuests(e.target.value)} className="w-12 pl-2 text-lg text-red-600 outline-none" name="" id="" />
          </div>

          <div className="flex ">

              <button onClick={resetInput} className="flex-grow">Cancel</button>
              {/* SEARCH BUTTON */}
              <button onClick={search} className="flex-grow text-red-600">Search</button>
              
              </div>
        </div>
      )}
       
    </header>
  );
}
export default Header;
