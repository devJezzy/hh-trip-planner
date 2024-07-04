import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center px-16 pt-10 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col">
            <div className="justify-center text-base leading-6 text-gray-600">AI Trip Planner</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1d6248cba43a0bb529d1852ac01d147aa2e54b9ce7d8510e37f12c0abb7894?apiKey=79050f2e54364c9b998b189296d8e734&"
              alt="AI Trip Planner logo"
              className="mt-6 w-14 aspect-square"
            />
            <div className="flex gap-5 justify-between items-center mt-6">
              <a href="#" className="flex justify-center items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4d1220ad2437375c7c4db7ba949baf27752c7250d999522854847961ba416ae?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt="Facebook"
                  className="w-6 aspect-square"
                />
              </a>
              <a href="#" className="flex justify-center items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3214b5f6e52cd14895494902aeab16ac8fd6a025aa010046089f6c3e514e706?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt="Twitter"
                  className="w-6 aspect-square"
                />
              </a>
              <a href="#" className="flex justify-center items-center self-stretch">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bc328d5268e377c7e0748636c9aea13fe2dba14a21eb3a5fef7afeb762eaa03?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt="Instagram"
                  className="w-7 aspect-square"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col pb-14 text-base leading-6 max-md:max-w-full">
            <h4 className="justify-center text-gray-700 max-md:max-w-full">Explore More</h4>
            <div className="flex flex-col justify-center mt-8 text-gray-600 max-md:max-w-full">
              <div className="flex gap-3 max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/41acbe5af07edbfee6a16ff99a41e92e9cccb04d6abf136772f4f582b88980ec?apiKey=79050f2e54364c9b998b189296d8e734&"
                  alt=""
                  className="shrink-0 w-12 aspect-square"
                />
                <div className="flex flex-col">
                  <h5 className="justify-center font-semibold">Marcos GPT</h5>
                  <p className="justify-center">Chat with Marcos and refine your trip (ChatGPT plus users)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10 pb-10 mt-10 max-md:max-w-full">
          <p className="justify-center text-base leading-6 text-gray-600 max-md:max-w-full">
            © 2024 BuildAI.Space LTD. All rights reserved.
          </p>
          <p className="flex gap-0 pr-20 text-xs leading-4 text-gray-400 max-md:flex-wrap max-md:pr-5">
            By using BuildAI, you agree to our{' '}
            <a href="#" className="justify-center font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="justify-center font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
