type ItineraryItemProps = {
  time: string;
  title: string;
  description: string;
  iconSrc: string;
  hasBookTour?: boolean;
  imageSrc?: string;
  name: string;
  destination : string;
};

const ItineraryItem: React.FC<ItineraryItemProps> = ({
  time,
  title,
  description,
  iconSrc,
  hasBookTour,
  imageSrc,
  name,
  destination
}) => {
  const mapUrl = `https://www.google.com/maps/search/${name.replace(/ /g, "+")}+in+${destination}`;
  return (
    <div className="flex flex-col justify-center mt-3 max-md:max-w-full">
      <div className="flex flex-col justify-center blur-none max-md:max-w-full">
        <div
          className={`flex ${
            imageSrc ? "gap-2" : ""
          } py-2.5 pr-2.5 pl-px bg-white rounded-2xl border border border-solid shadow-md ${
            imageSrc ? "max-md:flex-wrap" : ""
          }`}
        >
          <div
            className={`flex flex-col ${
              imageSrc ? "flex-1" : ""
            } max-md:max-w-full`}
          >
            <div className="flex flex-col justify-center px-2 text-xs font-light leading-6 text-neutral-400 max-md:max-w-full">
              <div className="flex flex-col justify-center items-start py-1 max-md:pr-5 max-md:max-w-full">
                <div className="justify-center">{time}</div>
              </div>
            </div>
            <div className="flex gap-3 pr-20 pl-3 mt-2 max-md:flex-wrap max-md:pr-5">
              <div className="flex justify-center items-center px-1 my-auto w-6 h-6 bg-purple-600 rounded-full">
                <img
                  loading="lazy"
                  src={iconSrc}
                  alt=""
                  className="w-4 aspect-square"
                />
              </div>
              <a
                href={mapUrl}
                target="_blank"
                className="justify-center text-xl font-medium leading-7 text-gray-900"
              >
                {title}
              </a>
            </div>
            <div className="flex flex-col justify-center px-2 mt-2 text-base font-light leading-6 text-neutral-400 max-md:max-w-full">
              <div className="justify-center px-1 py-2 rounded-xl max-md:max-w-full">
                {description}
              </div>
            </div>
            {hasBookTour && (
              <div className="flex gap-2 px-3 mt-2 text-base font-bold leading-6 text-purple-300 max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/091eb9f687f4f5a4ae97ec7060f10e3a1f6fcd161917dd8881439511f94cdb9d?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt=""
                  className="shrink-0 my-auto w-4 aspect-square"
                />
                <div className="max-md:max-w-full">Book a Tour</div>
              </div>
            )}
          </div>
          {imageSrc && (
            <div className="flex flex-col justify-end items-center pt-14">
              <img
                loading="lazy"
                src={imageSrc}
                alt=""
                className="aspect-square w-[90px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
