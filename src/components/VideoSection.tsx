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
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-sm hover:bg-blue-700 transition-colors cursor-pointer">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Flight Training Overview</p>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              alt="Flight training video thumbnail"
              className="h-full w-full object-cover opacity-50"
            />
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
