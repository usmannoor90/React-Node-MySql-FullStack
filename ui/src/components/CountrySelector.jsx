import { COUNTRIES } from "./country";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import dropArrow from "./../../pictures/countryDropArrow.svg";

export default function CountrySelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const mutableRef = ref.current;

    const handleClickOutside = (event) => {
      if (mutableRef && !mutableRef.contains(event.target) && open) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  const [query, setQuery] = useState("");

  return (
    <div ref={ref}>
      <div className=" relative">
        <button
          type="button"
          className={`${
            disabled ? "bg-[#9F9F9F]" : "bg-[#9F9F9F]"
          } relative w-full  py-3 rounded-[8px] pl-[65px] pr-3 h-[50px] bg-[#9F9F9F] border-[#9F9F9F] border-[1px] border-[solid] text-[16px] font-light leading-[20px] tracking-normal text-left text-[#040404] focus:outline-none transition-all ease-linear duration-300  focus:[filter:drop-shadow(0px_0px_7px_#8D49B6)] flex items-center justify-between `}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
          disabled={disabled}
        >
          <span className="truncate flex items-center">
            <img
              alt={`${selectedValue?.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue?.value}.svg`}
              className={` mr-2 h-4 rounded-sm ${
                selectedValue.value === "CHOOSE A COUNTRY" ? "hidden" : "inline"
              }`}
            />
            {selectedValue?.title}
          </span>
          <img
            src={dropArrow}
            alt=""
            className={` transition-all ease-linear duration-300  ${
              open ? "rotate-180" : ""
            }   transition-all`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-30 mt-1 w-full bg-white shadow-lg max-h-[18rem] overflow-hidden rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className=" text-gray-900 cursor-default select-none relative py-2 px-3">
                  <input
                    type="search"
                    name="search"
                    autoComplete={"on"}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                    placeholder={"Search a country"}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  "max-h-[15rem] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"
                }
              >
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No countries found
                  </li>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    return (
                      <li
                        key={`${id}-${index}`}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                        id="listbox-option-0"
                        role="option"
                        aria-selected="true"
                        onClick={() => {
                          onChange(value.value);
                          setQuery("");
                          onToggle();
                        }}
                      >
                        <img
                          alt={`${value.value}`}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                          className={` mr-2 h-4 rounded-sm ${
                            value.value === "CHOOSE A COUNTRY"
                              ? "hidden"
                              : "inline"
                          }`}
                        />

                        <span className="font-normal truncate">
                          {value.title}
                        </span>
                        {value.value === selectedValue.value ? (
                          <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </li>
                    );
                  })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
