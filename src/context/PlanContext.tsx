import React, { createContext, useState, ReactNode, useContext } from "react";

interface PlanPropsContext {
  tourPlan: string;
  setTourPlan: React.Dispatch<React.SetStateAction<string>>;
  hotels: { imageSrc: string; name: string; description: string }[];
  tours: {
    imageSrc: string;
    name: string;
    description: string;
    duration: string;
    location: string;
  }[];
  OtherTourPlan: {
    imageSrc: string;
    name: string;
    description: string;
    duration: string;
    location: string;
  }[];
}

const hotels = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c812e0c9c4c28e7bc4b4c57c2c8bdfb1cb089a443f15a8ac7669231988d8a664?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "The Leela Palace Chennai …",
    description:
      "Experience luxury and serenity at this 5-star hotel with views of the Bay of Bengal.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cea5b64aa7f69760dcddb151c0afdff2ad0dbfc5516fdf5b783999b51f5e1295?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "ITC Grand Chola Chennai -…",
    description:
      "Indulge in the grandeur and relaxation at one of the largest hotels in India.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c3c62d81ee4712a286b45f1de2a396c6e1d1b64fefc9984c5b2ec3b1a7d155ff?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Taj Coromandel Chennai - …",
    description:
      "Enjoy a peaceful stay at this elegant hotel known for its hospitality and comfort.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/53cef31e41e1046489c18092764f5338c9faa97db41be197512d17a10e272784?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Park Hyatt Chennai - Vela…",
    description:
      "Relax in the tranquil surroundings of this upscale hotel with top-notch amenities.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "The Raintree Hotel - St. M…",
    description:
      "Stay at this eco-friendly hotel for a soothing experience amidst nature and luxury.",
  },
];

const tours = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0293084d938983a0e0dcdde0d5c5e8e1cffc5e07ae72e5244520765e1769f906?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Heritage Walk - Mylapore",
    description:
      "Explore the cultural and architectural heritage of Chennai in a leisurely walk.",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/11c6242647eacb079a0e768e0755bf5414df76a3b4d48c5738b2abba8146304a?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Chennai City Cultural Tour",
    description:
      "Discover the rich culture and history of Chennai on a relaxing guided tour.",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/04471104a67963ca0f65ec77c526a484e35d405075e80325552166b831d2639b?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Eco Tour - Guindy National…",
    description:
      "Enjoy a peaceful day exploring the unique biodiversity of this urban national park.",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/11c6242647eacb079a0e768e0755bf5414df76a3b4d48c5738b2abba8146304a?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Chennai City Cultural Tour",
    description:
      "Discover the rich culture and history of Chennai on a relaxing guided tour.",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/04471104a67963ca0f65ec77c526a484e35d405075e80325552166b831d2639b?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Eco Tour - Guindy National…",
    description:
      "Enjoy a peaceful day exploring the unique biodiversity of this urban national park.",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/04471104a67963ca0f65ec77c526a484e35d405075e80325552166b831d2639b?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Eco Tour - Guindy National…",
    description:
      "Enjoy a peaceful day exploring the unique biodiversity of this urban national park.",
    duration: "1 day",
    location: "Chennai",
  },
];

const OtherTourPlan = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/52bdfdd03af00fdfa15289bbf07a9d7b0b31b6daf40d8f739035041fe192cd58?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "Relaxation in Chennai for 1 day",
    description: "",
    duration: "1 day",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b2a6f2f1737316e50bc4c96a41c1cf151e94ec521269a91e3a97aba5683d2b08?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "3 Days Relaxation in Chennai",
    description: "",
    duration: "3 days",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b2a6f2f1737316e50bc4c96a41c1cf151e94ec521269a91e3a97aba5683d2b08?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "4-Day Relaxation Trip in Chennai",
    description: "",
    duration: "4 days",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d1037f2a7c2b85bd1196bb92bec1c6c2ddd93d86615e95cc61b230da7a9665b2?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "5-Day Relaxation Trip in Chennai",
    description: "",
    duration: "5 days",
    location: "Chennai",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/02dc798ce0183a91f549c153af18526586a80857bd925c507999287343851329?apiKey=79050f2e54364c9b998b189296d8e734&",
    name: "6 Days of Relaxation in Chennai",
    description: "",
    duration: "6 days",
    location: "Chennai",
  },
];

const PlanContext = createContext<PlanPropsContext | undefined>(undefined);

export const GetPlanProps = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("GetPlanProps must be used within a Provider");
  }
  return context;
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [tourPlan, setTourPlan] = useState<string>("");

  return (
    <PlanContext.Provider
      value={{ tourPlan, setTourPlan, hotels, tours, OtherTourPlan }}
    >
      {children}
    </PlanContext.Provider>
  );
};
