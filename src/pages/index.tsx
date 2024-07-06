
import router from "next/router";
import React, { FormEvent, useState } from "react";
import Select from "react-dropdown-select";
import Image from "next/image";
import { useRef } from "react";

import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({ subsets: ["latin"] });

type TripCardProps = {
  imageSrc: string;
  title: string;
  days: number;
  location: string;
};

interface Option {
  label: string;
  value: number;
}

interface travelStyleOption {
  label: string;
  value: number;
}

const TripCard: React.FC<TripCardProps> = ({
  imageSrc,
  title,
  days,
  location,
}) => (
  <article className="flex flex-col grow justify-center text-sm text-black text-opacity-90">
    <div className="flex flex-col py-px bg-white rounded-lg border border-solid border-zinc-100">
      <img
        loading="lazy"
        src={imageSrc}
        alt={`Trip to ${location}`}
        className=" w-fulls max-w-[230px] "
      />
      <div className="flex flex-col px-4 py-3 rounded-none">
        <h3 className="justify-center leading-6">{title}</h3>
        <div className="flex flex-wrap gap-1 pt-2 leading-[143%]">
          <span className="justify-center px-2.5 py-px rounded-full border border-solid bg-neutral-200">
            {days} days
          </span>
          <span className="justify-center px-2.5 py-px rounded-full border border-solid bg-neutral-200">
            {location}
          </span>
        </div>
      </div>
    </div>
  </article>
);

type TripGridProps = {
  trips: TripCardProps[];
};

const TripGrid: React.FC<TripGridProps> = ({ trips }) => (
  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
    {trips.map((trip, index) => (
      <div
        key={index}
        className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
      >
        <TripCard {...trip} />
      </div>
    ))}
  </div>
);

const MyComponent: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const recentTrips = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/93274267ab974b5b9ef4d542986a483b3184a41c182b94a37c8d71d3052666d7?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "4-Day Family-Friendly Trip in South Africa 🌴",
      days: 4,
      location: "South Africa",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b81df1da20543a78fb2ef4a3c5130c86d85950194a6c37933a2f2384825d98e4?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "5-Day Family-Friendly Trip to Egypt",
      days: 5,
      location: "Egypt",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5e2f2dd811056609309724ab29df5d2e82d7470cff50a3198cd4b8dfba03eb66?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "5-Day Romantic Getaway in Cusco",
      days: 5,
      location: "Cusco",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/53730ee5578feb02c9b999fa6d7b9279adca979f144fbac8a898cb9c71f342f7?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "3-Day Relaxing Trip to Jaffa",
      days: 3,
      location: "Jaffa",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/62fbf7a79a7ecde95ae2a44852f19d6d22f288d0a56188e18fbd072d2eb2663a?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "4 Days in Family-Friendly Zimbabwe",
      days: 4,
      location: "Zimbabwe",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    // console.log("Form data:", data);
    router.push({
      pathname: "/Home",
      query: data,
    });
  };

  const options: Option[] = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
  ];
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange = (values: Option[]) => {
    setSelectedValues(values);
    // console.log("Selected values:", values);
  };

  const travelStyleOption: travelStyleOption[] = [
    { label: "Family-Friendly", value: 1 },
    { label: "Romantic for Couples", value: 2 },
    { label: "Adventure and Outdoor", value: 3 },
    { label: "Cultural and Historical", value: 4 },
  ];
  const [TravelStyleSelectedValues, setTravelStyleSelectedValues] = useState<
    Option[]
  >([]);

  const handleTraveStyleChange = (values: Option[]) => {
    setTravelStyleSelectedValues(values);
    // console.log("Selected values:", values);
  };

  const destinationOption: Option[] = [
    { label: "Kerala", value: 1},
    { label: "Goa", value: 2},
    { label: "Himachal", value: 3},
    { label: "Andaman", value: 4},
    { label: "Sikkim", value: 5},
    { label: "Mysore", value: 6},
    { label: "Kodaikanal", value: 7},
    { label: "Ooty", value: 8},
    { label: "Coorg", value: 9},
    { label: "Yercaud", value: 10},
    { label: "Delhi", value: 11},
    { label: "International Destinations", value: 12},
    { label: "Thailand", value: 13},
    { label: "Singapore", value: 14},
    { label: "Srilanka", value: 15},
    { label: "Europe", value: 16},
    { label: "Mauritius", value: 17},
    { label: "Maldives", value: 18},
    { label: "Malaysia", value: 1},
    { label: "dubai", value: 19},
    { label: "Bali", value: 20},
    { label: "Vietnam", value: 21},
  ];
  const [selectedDestination, setSelectedDestination] = useState<Option[]>([]);

  const handleDestinationChange = (values: Option[]) => {
    setSelectedDestination(values);
    // console.log("Selected values:", values);
  };
  return (
    <div className="flex flex-col">
      <header className="flex flex-col self-center pb-5 max-w-full w-1/3 max-md:w-11/12">
        <div className="trip-planner-sec px-4 pt-12 max-md:max-w-full">
          <div className="name-logo-sec flex flex-row">
            <h1 className="pt-10 text-6xl tracking-tighter max-md:max-w-full max-md:text-4xl">
              <span className={dancingScript.className}>AI Trip Planner</span>
            </h1>
            <Image
              className="mx-8 max-md:mx-2 max-md:w-25"
              src="/travel-bot.png"
              alt="Main"
              width={150}
              height={50}
            />
          </div>
          <p className="type justify-center text-xl tracking-wide leading-7 text-purple-700 max-md:max-w-full max-md:text-sm">
            Plan your dream trip with personalized itineraries.
          </p>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col px-4 pt-10 pb-2 max-w-full"
        >
          <div className="flex  max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full py-2">
              <label
                htmlFor="travelDays"
                className="justify-center text-base leading-6 text-black"
              >
                Travel days
              </label>
              <div className="flex flex-col justify-center mt-2">
                <Select
                  name="travelDays"
                  placeholder="Travel Days"
                  options={options}
                  values={selectedValues}
                  onChange={handleChange}
                  style={{ padding: "20px", borderRadius: "10px" }}
                  color="gray"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full py-2">
              <label
                htmlFor="destination"
                className="justify-center text-base leading-6 text-black whitespace-nowrap"
              >
                Destination
              </label>
              <div className="flex flex-col justify-center mt-2">
                <Select
                  name="destination"
                  placeholder="Destination"
                  options={destinationOption}
                  values={selectedDestination}
                  onChange={handleDestinationChange}
                  style={{ padding: "20px", borderRadius: "10px" }}
                  color="gray"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full py-2">
              <label
                htmlFor="travelStyle"
                className="justify-center text-base leading-6 text-black"
              >
                Travel style
              </label>
              <div className="flex flex-col justify-center mt-2">
                <Select
                  name="travelStyle"
                  placeholder="Travel Style"
                  options={travelStyleOption}
                  values={TravelStyleSelectedValues}
                  onChange={handleTraveStyleChange}
                  style={{ padding: "20px", borderRadius: "10px" }}
                  color="gray"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex text-white self-end flex-col justify-center px-5 py-3 max-w-full bg-purple-700 rounded-xl border-2 border-purple-700 border-solid w-[111px] max-md:px-5 my-4"
          >
            <div className="flex flex-col justify-center">
              <div className="flex gap-1">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb0d0658cf9b335cdaacd81b9ab907245576d9c177f77639f741b8ddd5f7bf87?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt=""
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <span className="justify-center">Run</span>
              </div>
            </div>
          </button>
        </form>
      </header>
      <main className="flex flex-col mt-5 max-md:max-w-full">
        <section className="flex flex-col w-1/3 max-md:w-11/12 self-center">
          <div className="flex flex-col px-12 py-10 bg-white rounded-3xl border border-solid shadow-md max-md:px-5 max-md:max-w-full">
            <h2 className="justify-center items-center px-16 text-3xl leading-9 text-center text-black max-md:px-5 max-md:max-w-full">
              Recently Created Trip Plans
            </h2>
            <div className="flex flex-col pt-4 mt-4">
              <TripGrid trips={recentTrips.slice(0, 3)} />
              <TripGrid trips={recentTrips.slice(3, 6)} />
              <TripGrid trips={recentTrips.slice(6, 9)} />
              <TripGrid trips={recentTrips.slice(9, 12)} />
              <TripGrid trips={recentTrips.slice(12, 15)} />
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center px-16 py-8 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between max-md:flex-wrap">
            <div className="flex flex-col pb-2 text-lg leading-7 text-black">
              <h3 className="justify-center font-semibold">
                Don&apos;t see the right plan for you?
              </h3>
              <p className="justify-center">We&apos;ve got you covered</p>
            </div>
            <button
              onClick={scrollToForm}
              className="flex flex-col justify-center px-7 py-5 text-xl leading-7 text-center text-white bg-purple-700 rounded-xl border-2 border-gray-900 border-solid max-md:px-5"
            >
              <div className="flex flex-col justify-center">
                <div className="flex gap-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc92b9fa58a3189780c02ecd5ba378d4ddc77b410cbf35c9cae6d5e19ded1c4f?apiKey=79050f2e54364c9b998b189296d8e734&"
                    alt=""
                    className="shrink-0 my-auto w-5 aspect-square"
                  />
                  <span className="justify-center">Tailor your plan</span>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyComponent;
