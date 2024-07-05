type HotelCardProps = {
  imageSrc: string;
  name: string;
  description: string;
};

const HotelCard: React.FC<HotelCardProps> = ({
  imageSrc,
  name,
  description,
}) => (
  <div className="flex flex-col flex-1 pb-5 rounded-lg border border-solid bg-white bg-opacity-30 border-zinc-100">
    <img
      loading="lazy"
      src={imageSrc}
      alt={`${name} hotel`}
      className="w-full aspect-[1.25]"
    />
    <div className="flex flex-col justify-center mt-5">
      <div className="flex flex-col">
        <div className="justify-center text-base font-semibold leading-6 text-black text-opacity-90">
          {name}
        </div>
        <div className="justify-center mt-2 text-sm font-light leading-6 text-black text-opacity-50">
          {description}
        </div>
      </div>
    </div>
  </div>
);

export default HotelCard;
