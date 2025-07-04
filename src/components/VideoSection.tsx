const VideoSection = () => {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Experience Flight Training
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Watch our professional training in action
          </p>
        </div>
        
        <div className="mx-auto mt-4 max-w-xl">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/cOMG2mj16WQ?list=PL4262FD18248BD150"
              title="Learn to fly with Sporty's Pilot Training Courses - Private, Instrument, Commercial ground school"
              className="h-full w-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Minimal Stats */}
          <div className="mt-4 flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-600">500+</div>
              <div className="text-xs text-gray-500">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-600">15+</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-600">98%</div>
              <div className="text-xs text-gray-500">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
