type TourCardProps = {
  imageSrc: string;
  name: string;
  description: string;
  duration: string;
  location: string;
};

const TourCard: React.FC<TourCardProps> = ({ imageSrc, name, description, duration, location }) => (
  <div className="flex flex-col grow justify-center text-sm text-black text-opacity-90 max-md:mt-8 w-1/3 flex-shrink-0">
    <div className="flex flex-col py-px bg-white rounded-lg border border-solid border-zinc-100">
      <img loading="lazy" src={imageSrc} alt={`${name} tour`} className="w-full aspect-[1.43]" />
      <div className="flex flex-col px-4 py-3 rounded-none">
        <div className="justify-center leading-[157%]">{name}</div>
        <div className="flex flex-wrap gap-1 pt-2 mt-6 leading-[143%]">
          <div className="justify-center px-2.5 py-px rounded-full border border border-solid bg-neutral-200">{duration}</div>
          <div className="justify-center px-2.5 py-px whitespace-nowrap rounded-full border border border-solid bg-neutral-200">{location}</div>
        </div>
      </div>
    </div>
  </div>
);

export default TourCard;