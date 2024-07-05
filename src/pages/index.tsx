import DropdownComponent from "@/components/dropDown";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import Select from "react-dropdown-select";

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
        className="mx-6 w-full aspect-[1.43] max-w-[230px] max-md:mx-2.5"
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
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9b42d1fd0222b81307b67fb6b0f57b01b3a54df93fd87f69a6ede04349940641?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "5-Day Relaxation Trip in Poland",
      days: 5,
      location: "Poland",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1dd563a5511c8e7b87e90935cefe2f3c333563268b25ca4804cd4bb49782adaa?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "4-Day Relaxation Trip in Miami",
      days: 4,
      location: "Miami",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f13afc401a1e0e8a46ad2f01aa2225bea6390a82e168eb0c86158058a625e9d7?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "Family-Friendly Bangalore Urban Itinerary for 3 Days",
      days: 3,
      location: "Bangalore Urban",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8ba8ce64f415cd75a50ddd5414ab06a36e401a861654089e03bdd2ea15168a5a?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "2-Day Family-Friendly Trip in Bangalore Urban",
      days: 2,
      location: "Bangalore Urban",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/932ee4ca3f2d1efcd2ade1d967493476a9387ded5af0cc658c8bb49f0c4c2bb1?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "Family-Friendly Bangalore Urban Trip in 1 Day",
      days: 1,
      location: "Bangalore Urban",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c0b1bc44ceda5a9ad306814b7956eae9d0d5d4259540b5fc16d034f18adddddb?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "One day in Family-Friendly Bangalore Urban",
      days: 1,
      location: "Bangalore Urban",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/64b08909bfbbf4e04038c3e107f81c0549bdeed9c05556c316c9329d9a7d3755?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "1 Day Trip to Manilla with Family-Friendly Activities",
      days: 1,
      location: "Manilla",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4f0c507ab98a4fa54c3392eeb8e3525571a6c4fbe9e482915ff9c7b43e5d9d?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "2-Day Family-Friendly Trip to Manilla 🌴",
      days: 2,
      location: "Manilla",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4f0c507ab98a4fa54c3392eeb8e3525571a6c4fbe9e482915ff9c7b43e5d9d?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "3-Day Family-Friendly Trip to Manilla",
      days: 3,
      location: "Manilla",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4f0c507ab98a4fa54c3392eeb8e3525571a6c4fbe9e482915ff9c7b43e5d9d?apiKey=79050f2e54364c9b998b189296d8e734&",
      title: "4 Days of Relaxation in Manilla",
      days: 4,
      location: "Manilla",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    console.log("Form data:", data);
    router.push({
      pathname: "/Home",
      query: data,
    });
  };

  const options: Option[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 }
  ];
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange = (values: Option[]) => {
      setSelectedValues(values);
      console.log("Selected values:", values);
  };

  const travelStyleOption: travelStyleOption[] = [
    { label: 'Family-Friendly', value: 1 },
    { label: 'Romantic for Couples', value: 2},
    { label: 'Adventure and Outdoor', value: 3},
    { label: 'Cultural and Historical', value: 4 },
  ];
  const [TravelStyleSelectedValues, setTravelStyleSelectedValues] = useState<Option[]>([]);

  const handleTraveStyleChange = (values: Option[]) => {
    setTravelStyleSelectedValues(values);
      console.log("Selected values:", values);
  };
  return (
    <div className="flex flex-col">
      <header className="flex flex-col self-center pb-5 max-w-full w-[900px]">
        <div className="flex flex-col justify-center px-4 max-md:max-w-full">
          <div className="flex flex-col pt-12 max-w-[900px] max-md:max-w-full">
            <h1 className="flex flex-col justify-center pt-10 text-6xl tracking-tighter text-black leading-[67.2px] max-md:max-w-full max-md:text-4xl">
              <span className="pb-2 max-md:max-w-full max-md:text-4xl">
                AI Trip Planner 🌴
              </span>
            </h1>
            <p className="justify-center text-xl tracking-wide leading-7 text-purple-700 max-md:max-w-full">
              Plan your dream trip with personalized itineraries.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-4 pt-10 pb-2 mt-5 max-md:pr-5 max-md:max-w-full"
        >
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex-wrap max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center self-stretch py-2">
                    <div className="flex flex-col pb-7">
                      <label
                        htmlFor="travelDays"
                        className="justify-center text-base leading-6 text-black"
                      >
                        Travel days
                      </label>
                      <div className="flex flex-col justify-center mt-2">
                        <Select
                          name="travelDays"
                          placeholder	= "Travel Days"
                          options={options}
                          values={selectedValues}
                          onChange={handleChange}
                          style={{ padding: "20px", borderRadius: "10px" }}
                          color="gray"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center self-stretch py-2">
                    <div className="flex flex-col pb-7">
                      <label
                        htmlFor="destination"
                        className="justify-center text-base leading-6 text-black whitespace-nowrap"
                      >
                        Destination
                      </label>
                      <div className="flex flex-col justify-center mt-2">
                        <DropdownComponent />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center self-stretch py-2">
                    <div className="flex flex-col pb-7">
                      <label
                        htmlFor="travelStyle"
                        className="justify-center text-base leading-6 text-black"
                      >
                        Travel style
                      </label>
                      <div className="flex flex-col justify-center mt-2">
                        <Select
                          name="travelStyle"
                          placeholder	= "Travel Style"
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
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex flex-col justify-center items-end px-16 text-xl leading-7 text-center text-white whitespace-nowrap max-md:pl-5 max-md:max-w-full"
            >
              <div className="flex flex-col justify-center px-7 py-5 max-w-full bg-purple-700 rounded-xl border-2 border-purple-700 border-solid w-[111px] max-md:px-5">
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
              </div>
            </button>
          </div>
        </form>
      </header>
      <main className="flex flex-col pt-16 mt-5 max-md:max-w-full">
        <section className="flex flex-col w-[900px] self-center">
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
            <button className="flex flex-col justify-center px-7 py-5 text-xl leading-7 text-center text-white bg-purple-700 rounded-xl border-2 border-gray-900 border-solid max-md:px-5">
              <div className="flex flex-col justify-center">
                <div className="flex gap-1">
                  ∂
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
      <footer className="flex flex-col items-center px-16 pt-10 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
          <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col">
              <p className="justify-center text-base leading-6 text-gray-600">
                AI Trip Planner
              </p>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bee9ef1419e8b312789dc502ebffc0bb9b01468996cbe7713363be9f25c4ddf?apiKey=79050f2e54364c9b998b189296d8e734&"
                alt="AI Trip Planner Logo"
                className="mt-6 w-14 aspect-square"
              />
              <div className="flex gap-5 justify-between items-center mt-6">
                <a
                  href="#"
                  className="flex justify-center items-center self-stretch my-auto"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7169df64b2359756fc08f3724453fc4e47104af181b5e0f4fa35e03a0c692933?apiKey=79050f2e54364c9b998b189296d8e734&"
                    alt="Social Media Icon"
                    className="w-6 aspect-square"
                  />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center self-stretch my-auto"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7926e2031e3c3f44dce4675b310cd4c4181fdd4e4a800f410074d87eaa289a3f?apiKey=79050f2e54364c9b998b189296d8e734&"
                    alt="Social Media Icon"
                    className="w-6 aspect-square"
                  />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center self-stretch"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6438297eed049a11e67461955b7f48a52c878fb0b340a2cdf2218d12db01808b?apiKey=79050f2e54364c9b998b189296d8e734&"
                    alt="Social Media Icon"
                    className="w-7 aspect-square"
                  />
                </a>
              </div>
            </div>
            <nav className="flex flex-col pb-14 text-base leading-6 max-md:max-w-full">
              <h4 className="justify-center text-gray-700 max-md:max-w-full">
                Explore More
              </h4>
              <div className="flex flex-col justify-center mt-8 text-gray-600 max-md:max-w-full">
                <a href="#" className="flex gap-3 max-md:flex-wrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a40e5ed44099bc3be6cdef84cc2ffa3e5bbd9e50afa5ab58a3fc527d02b7de7?apiKey=79050f2e54364c9b998b189296d8e734&"
                    alt="Marcos GPT Icon"
                    className="shrink-0 w-12 aspect-square"
                  />
                  <div className="flex flex-col">
                    <h5 className="justify-center font-semibold">Marcos GPT</h5>
                    <p className="justify-center">
                      Chat with Marcos and refine your trip (ChatGPT plus users)
                    </p>
                  </div>
                </a>
              </div>
            </nav>
          </div>
          <div className="flex flex-col pt-10 pb-10 mt-10 border-t border-solid max-md:max-w-full">
            <p className="justify-center text-base leading-6 text-gray-600 max-md:max-w-full">
              © 2024 BuildAI.Space LTD. All rights reserved.
            </p>
            <div className="flex gap-0 pr-20 text-xs leading-4 text-gray-400 max-md:flex-wrap max-md:pr-5">
              <p>By using BuildAI, you agree to our</p>
              <a href="#" className="justify-center font-semibold">
                Terms of Service
              </a>
              <p>and</p>
              <a href="#" className="justify-center font-semibold">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyComponent;
