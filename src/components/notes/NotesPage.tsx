const NotesPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl mb-8">Patch Notes</h1>
      <h2></h2>
      <div className="w-64 h-64 bg-red-100 relative">
        <div className="absolute inset-0 bg-cover bg-center z-0 background-image: url('https://upload.wikimedia.org/wikipedia/en/3/3c/JumanjiTheNextLevelTeaserPoster.jpg')"></div>
        <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold">
          Dwayne
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
