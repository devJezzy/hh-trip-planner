"use client";
import React, { useEffect, useState } from "react";
import HotelCard from "@/components/HotelProp";
import TourCard from "@/components/TourPro";
import ItineraryItem from "@/components/ItenaryItem";
import searchImages from "@/utils/getImage";
import { GetPlanProps } from "@/context/PlanContext";
import Footer from "@/components/Footer";
import getResponse from "@/utils/gemini";
import { useRouter } from "next/router";

interface Activities {
  Time: string;
  Activity: string;
  Comments: string;
  Type: string;
  Name: string
}

interface DayItinerary {
  Day: string;
  Itinerary: Activities[];
}

interface TransformedItineraryItem {
  time: string;
  title: string;
  description: string;
  imageSrc: string;
  iconSrc: string;
  name: string;
}

interface TransformedItineraryDay {
  day: string;
  items: TransformedItineraryItem[];
}

const iconSrcMapping: Record<string, string> = {
  FOOD: "https://cdn.builder.io/api/v1/image/assets/TEMP/4288ded5db6f47d2bfd9a43b489b2d0eef26d4b672ddc214ecb84fe53846545e?apiKey=79050f2e54364c9b998b189296d8e734&",
  FINDHOTEL:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/3ee04e66e3e8f5b9516ca4a5515218209a659dad7ab8a9f46dd3d327329e9924?apiKey=79050f2e54364c9b998b189296d8e734&",
  default:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/0b24e4c715f5af249791ce7936a6b94aee43a6dafcaa3b2348285d4ebf61ab25?apiKey=79050f2e54364c9b998b189296d8e734&",
};

const MyComponent: React.FC = () => {
  const router = useRouter();
  const { travelDays, destination, travelStyle } = router.query;
  const city = Array.isArray(destination) ? destination.join(", ") : (destination ?? "");

  const tripTitle =
    travelDays == "1"
      ? `${travelStyle} in`
      : `${travelDays} Days ${travelStyle} Trip in`;
  useEffect(() => {
    // console.log("Received query parameters:");
    // console.log("Travel days:", travelDays);
    // console.log("Destination:", destination);
    // console.log("Travel style:", travelStyle);
    if (travelDays && destination && travelStyle) {
      main(`${travelStyle} trip to ${destination} for ${travelDays} days`);
    }
  }, [travelDays, destination, travelStyle]);

  async function main(query: string) {
    try {
      // console.log(query);
      const response = await getResponse(query);
      console.log(response);
      const itineraryData: DayItinerary[] = JSON.parse(response);
      const transformedData = await transformItinerary(itineraryData);
      // console.log(transformedData);
      // console.log("transformedData");
      SetitIneraryData(transformedData);
    } catch (error) {
      console.error(error);
    }
  }

  const default_data: TransformedItineraryDay[] = [
    {
      day: "",
      items: [
        {
          time: "",
          title: "",
          description: "",
          iconSrc: "",
          imageSrc: "",
          name:""
        },
      ],
    },
  ];

  const [itineraryData, SetitIneraryData] =
    useState<TransformedItineraryDay[]>(default_data);

  function getTourPlan() {
    return (
      <>
        {itineraryData.map((day, index) => (
          <div className="flex flex-col max-md:max-w-full" key={index}>
            <h3 className="justify-center text-2xl font-semibold leading-6 text-black max-md:max-w-full">
              {day.day}
            </h3>
            
            <div className="flex flex-col mt-6 max-md:max-w-full">
              {day.items.map((item, idx) => (
                <ItineraryItem
                  key={idx}
                  time={item.time}
                  title={item.title}
                  description={item.description}
                  iconSrc={item.iconSrc}
                  imageSrc={item.imageSrc}
                  name={item.name}
                  destination = {city}
                />
              ))}
              <div className="flex flex-col justify-end py-20">
                <div className="flex flex-col justify-end pt-2">
                  <button className="flex gap-0 justify-center px-3 py-2 bg-purple-600 rounded-lg max-w-[174px]">
                    <span className="text-sm font-bold leading-5 text-center text-white">
                      Find hotels
                    </span>
                    <div className="flex flex-col justify-center pl-2 my-auto">
                      <div className="flex flex-col justify-center items-start">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff31f66c00e1defcc6792f3ca357d4328bb54939b69974e10792137c440c0283?apiKey=79050f2e54364c9b998b189296d8e734&"
                          alt=""
                          className="w-3.5 aspect-square"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  const getOtherTourPlan = () => {
    return (
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {OtherTourPlan.map((tour, index) => (
          <TourCard
            key={index}
            imageSrc={tour.imageSrc}
            name={tour.name}
            description={tour.description}
            duration={tour.duration}
            location={tour.location}
          />
        ))}
      </div>
    );
  };

  async function transformItinerary(
    originalData: DayItinerary[]
  ): Promise<TransformedItineraryDay[]> {
    return Promise.all(
      originalData.map(async (dayData) => {
        const transformedItems: TransformedItineraryItem[] = await Promise.all(
          dayData.Itinerary.map(async (item: Activities) => {
            const { Time, Activity, Comments, Type, Name } = item;
            const iconSrc = iconSrcMapping[Type] || iconSrcMapping.default;

            try {
              const result = await searchImages(Activity);
              const imageSrc = result[0]?.largeImageURL || "";

              return {
                time: Time,
                title: Activity,
                description: Comments,
                imageSrc,
                iconSrc,
                name:Name
              };
            } catch (error) {
              console.error(
                `Error fetching image for activity ${Activity}:`,
                error
              );
              return {
                time: Time,
                title: Activity,
                description: Comments,
                imageSrc: "",
                iconSrc,
                name:Name
              };
            }
          })
        );

        return {
          day: dayData.Day,
          items: transformedItems,
        };
      })
    );
  }

  const { hotels } = GetPlanProps();
  const { tours } = GetPlanProps();
  const { OtherTourPlan } = GetPlanProps();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-center bg-[linear-gradient(0deg,#FFF_0%,#FFF_100%,#FFF)]">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex flex-col self-center max-w-full w-[900px]">
          <header className="flex flex-col justify-center px-4 max-md:max-w-full">
            <div className="flex flex-col max-w-[900px] max-md:max-w-full">
              <button
                onClick={handleNavigateBack}
                className="flex z-10 flex-col pt-8 w-[46px]"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eef449fac01638cd2827539ac2ec782fe147ac92b8f938332799b14b388ddfa?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt=""
                  className="aspect-square w-[18px]"
                />
              </button>
              <h1 className="flex flex-col justify-center pt-10 text-6xl tracking-tighter text-black leading-[67.2px] max-md:max-w-full max-md:text-4xl">
                <div className="pb-2 max-md:max-w-full max-md:text-4xl">
                  AI Trip Planners
                </div>
              </h1>
              <p className="justify-center text-xl tracking-wide leading-7 text-purple-700 max-md:max-w-full"> 
                Plan your dream trip with personalized itineraries.
              </p>
            </div>
          </header>
          <main className="flex flex-col justify-center mt-5 max-md:max-w-full">
            <section className="flex flex-col pb-12 max-w-[900px] max-md:max-w-full">
              <div className="flex flex-col flex-wrap justify-center max-md:max-w-full">
                <div className="flex flex-col px-4 max-md:max-w-full">
                  <div className="flex flex-col text-base leading-6 text-black max-md:max-w-full">
                    <div className="flex flex-wrap gap-2 items-start pr-20 pb-4 max-md:pr-5">
                      <div className="flex flex-col justify-center px-2 rounded-full bg-neutral-100 max-w-[300px]">
                        <div className="flex flex-col justify-center">
                          <div className="justify-center">
                            {travelDays == "1" ? "day" : "days"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-2 whitespace-nowrap rounded-full bg-neutral-100 max-w-[300px]">
                        <div className="flex flex-col justify-center">
                          <div className="justify-center">{destination}</div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-2 whitespace-nowrap rounded-full bg-neutral-100 max-w-[300px]">
                        <div className="flex flex-col justify-center">
                          <div className="justify-center">{travelStyle}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-end pr-2 pl-16 whitespace-nowrap max-md:pl-5 max-md:max-w-full">
                      <div className="flex gap-0">
                        <button className="flex gap-1 p-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c2953f06d09310f1f0cd7b6b31de8408f7c1d4ae5059ed2942bf06730fc5a98?apiKey=79050f2e54364c9b998b189296d8e734&"
                            alt=""
                            className="shrink-0 my-auto w-5 aspect-square"
                          />
                          <span className="justify-center">Rerun</span>
                        </button>
                        <button className="flex gap-1 p-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e29da78e6ae7fbeec60057c47cbc17214585ea0f186a04a0b9d68c36070a878f?apiKey=79050f2e54364c9b998b189296d8e734&"
                            alt=""
                            className="shrink-0 my-auto w-5 aspect-square"
                          />
                          <span className="justify-center">Copy</span>
                        </button>
                        <button className="flex gap-1 p-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a91dab119bd3fd53970a668e7bcce8d400a8c93d7202f8a1f247ac1ae1fc79c5?apiKey=79050f2e54364c9b998b189296d8e734&"
                            alt=""
                            className="shrink-0 w-6 aspect-square"
                          />
                          <span className="justify-center">Save</span>
                        </button>
                        <button className="flex gap-1 p-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/67cdd1d5149a97aa3277254c786555524f850418eea1b1fbe6383d8ad11f324e?apiKey=79050f2e54364c9b998b189296d8e734&"
                            alt=""
                            className="shrink-0 my-auto w-5 aspect-square"
                          />
                          <span className="justify-center">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <article className="flex flex-col justify-center p-px bg-white rounded-2xl border border border-solid max-w-[1916px] max-md:max-w-full">
                    <div className="flex flex-col justify-center pb-12 max-md:max-w-full">
                      <div className="flex flex-col max-md:max-w-full">
                        <div className="flex flex-col justify-center text-4xl font-bold text-center text-white leading-[60px] max-md:max-w-full">
                          <div className="flex overflow-hidden relative flex-col justify-center w-full min-h-[320px] max-md:max-w-full">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d6073c01f85c38e08281dd37c62770ee08d558bf871f25852991c076c601017?apiKey=79050f2e54364c9b998b189296d8e734&"
                              alt="Chennai cityscape"
                              className="object-cover absolute inset-0 size-full"
                            />
                            <div className="flex relative justify-center items-center px-16 py-20 bg-black bg-opacity-20 max-md:px-5 max-md:max-w-full">
                              <h2 className="justify-center px-9 py-2 mt-2 mb-4 max-w-full rounded-xl w-[500px] max-md:px-5 max-md:max-w-full">
                                {tripTitle} <br /> {destination}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col max-md:max-w-full">
                          <div className="flex flex-col px-4 pt-4 pb-7 max-md:max-w-full">
                            {getTourPlan()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <section className="flex flex-col justify-center px-4 mt-2 text-2xl leading-8 text-black max-md:max-w-full">
                      <h3 className="pt-4 pb-1.5 max-md:max-w-full">
                        Recommended Hotels
                      </h3>
                    </section>
                    <div className="flex overflow-x-auto gap-5 justify-end py-4 pl-4 mt-2 max-md:flex-wrap">
                      {hotels.map((hotel, index) => (
                        <HotelCard key={index} {...hotel} />
                      ))}
                    </div>
                    <section className="flex flex-col justify-center px-4 mt-2 text-2xl leading-8 text-black max-md:max-w-full">
                      <h3 className="pt-4 pb-1.5 max-md:max-w-full">
                        Recommended Tours
                      </h3>
                    </section>
                    <div className="flex overflow-x-auto gap-5 py-4 pl-4 mt-2 max-md:flex-wrap horizontal-scroll-container">
                      {tours.map((tour, index) => (
                        <TourCard key={index} {...tour} />
                      ))}
                    </div>
                  </article>
                  {/* <div className="flex flex-col px-6 pb-10 mt-5 max-md:px-5 max-md:max-w-full"> */}
                  <section className="flex flex-wrap px-12 py-10 bg-white rounded-3xl border border-solid shadow-md my-10 horizontal-scroll-container">
                    <h3 className="pb-4 text-3xl leading-9 text-black max-w-full">
                      You might also find these itineraries interesting:
                    </h3>
                    <div className="flex flex-wrap gap-5">
                      ß {getOtherTourPlan()}
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MyComponent;
