const AboutPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-4xl font-bold">About this app</h1>
        <p className="text-lg">
          This app is a simple app that allows you to check the arrivals at bus
          stops in London.
        </p>
        <ul>
          <li className="list-disc">
            Please do not run after a train using this app. We are not liable
            for any accidents that may occur.
          </li>
          <li className="list-disc">
            The arrivals times are real-time data and are not simulated.
          </li>
          <li className="list-disc">
            The arrivals times are not 100% accurate and have a +/- 2min
            accuracy at times.
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <p>made with ❤️ by</p>
        <a href="https://github.com/imBanden/" target="_blank">
          <p className="text-lg">imBanden</p>
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
