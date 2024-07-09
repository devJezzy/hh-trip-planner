"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import searchImages from "@/utils/getImage";
import getResponse from "@/utils/gemini";
import { useRouter } from "next/router";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
// import ChatBot from "@/components/chatBot";
const dancingScript = Dancing_Script({ subsets: ["latin"] });
import MapComponent from "@/components/GoogleMaps";
import ChatBotPc from "@/components/chatbotPc";

const ItineraryItem = dynamic(() => import("@/components/ItenaryItem"));
const Blob = dynamic(() => import("@/components/Blob"));
const Footer = dynamic(() => import("@/components/Footer"));

interface Activities {
  Time: string;
  Activity: string;
  Comments: string;
  Type: string;
  Name: string;
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
  const city = Array.isArray(destination)
    ? destination.join(", ")
    : destination ?? "";
  const [isLoaded, setIsLoaded] = useState(false);

  const tripTitle =
    travelDays == "1"
      ? `${travelStyle} in`
      : `${travelDays} Days ${travelStyle} Trip in`;

  const [itineraryData, setItineraryData] = useState<TransformedItineraryDay[]>(
    []
  );

  const fetchItinerary = useCallback(async (query: string) => {
    try {
      const response = await getResponse(query);
      const itineraryData: DayItinerary[] = JSON.parse(response);
      transformItinerary(itineraryData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (travelDays && destination && travelStyle) {
      fetchItinerary(
        `${travelStyle} trip to ${destination} for ${travelDays} days`
      );
    }
  }, [travelDays, destination, travelStyle, fetchItinerary]);

  const transformItinerary = useCallback(
    async (originalData: DayItinerary[]) => {
      for (const dayData of originalData) {
        const transformedItems: TransformedItineraryItem[] = [];
        for (const item of dayData.Itinerary) {
          const { Time, Activity, Comments, Type, Name } = item;
          const iconSrc = iconSrcMapping[Type] || iconSrcMapping.default;
          try {
            const result = await searchImages(Activity);
            const imageSrc = result[0]?.largeImageURL || "";
            transformedItems.push({
              time: Time,
              title: Activity,
              description: Comments,
              imageSrc,
              iconSrc,
              name: Name,
            });
          } catch (error) {
            console.error(
              `Error fetching image for activity ${Activity}:`,
              error
            );
            transformedItems.push({
              time: Time,
              title: Activity,
              description: Comments,
              imageSrc: "",
              iconSrc,
              name: Name,
            });
          }
        }
        setItineraryData((prevData) => [
          ...prevData,
          { day: dayData.Day, items: transformedItems },
        ]);
      }
      setIsLoaded(true);
    },
    []
  );

  const handleNavigateBack = () => {
    router.back();
  };

  const default_data: TransformedItineraryDay[] = useMemo(
    () => [
      {
        day: "",
        items: [
          {
            time: "",
            title: "",
            description: "",
            iconSrc: "",
            imageSrc: "",
            name: "",
          },
        ],
      },
    ],
    []
  );
    return (
      <div className="flex flex-col justify-center bg-[linear-gradient(0deg,#FFF_0%,#FFF_100%,#FFF)] h-screen">
        {!isLoaded ? (
          <Blob />
        ) : (
          <div className="flex flex-col w-full max-md:max-w-full h-full">
            <div className="z-10 bg-opacity-0">
              {/* <ChatBot /> */}
            </div>
            <button
              onClick={handleNavigateBack}
              className="flex z-10 flex-col pt-8 w-[46px] p-4"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eef449fac01638cd2827539ac2ec782fe147ac92b8f938332799b14b388ddfa?apiKey=79050f2e54364c9b998b189296d8e734&"
                alt=""
                className="aspect-square w-[18px]"
              />
            </button>
            <div className="flex flex-col self-center max-w-full w-[90%]">
              <header className="flex flex-col self-center pb-5 max-sm:w-[90%]">
                <div className="trip-planner-sec px-4 pt-12 max-md:max-w-full">
                  <div className="name-logo-sec flex flex-row ">
                    <h1 className="pt-10 text-6xl tracking-tighter max-md:max-w-full max-md:text-4xl">
                      <span className={dancingScript.className}>
                        AI Trip Planner
                      </span>
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
              </header>
              <main className="flex flex-col justify-center mt-5 max-md:max-w-full inset-0">
                <section className="flex flex-col pb-12 max-w-[90%] max-md:max-w-full">
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
                      </div>
                      <div className="flex flex-row overflow-hidden h-[50vh]">
                        <div className="w-1/2 m-2">
                          <ChatBotPc />
                        </div>
                        <article className="flex flex-col p-px bg-white rounded-2xl max-md:max-w- overflow-hidden w-1/2 m-2 overflow-y-auto h-full">
                          <div className="flex flex-col max-md:max-w-full">
                            <div className="text-4xl font-bold text-center text-white flex overflow-hidden relative flex-col justify-center w-ful max-md:max-w-full">
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
                            <div className="flex flex-col px-4 pt-4 pb-7 max-md:max-w-full">
                              {itineraryData.map((day, index) => (
                                <div
                                  className="flex flex-col max-md:max-w-full"
                                  key={index}
                                >
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
                                        destination={city}
                                      />
                                    ))}
                                    <div className="flex flex-col justify-end py-5 pt-2">
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
                            </div>
                          </div>
                          <MapComponent
                            addresses={itineraryData.flatMap((day) =>
                              day.items.map(
                                (item) => item.name + "in" + destination
                              )
                            )}
                          />
                        </article>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default MyComponent;
