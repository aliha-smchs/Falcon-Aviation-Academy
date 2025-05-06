import { useState } from "react";
import { Plane, Route, Navigation, Settings } from "lucide-react";

const Courses = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const features = [
    {
      name: "Core Licenses",
      description: "Start your aviation journey with our comprehensive training programs, from first flight to commercial license.",
      icon: <Plane className="w-5 h-5" />,
      content: [
        {
          title: "Trial Introductory Flight (TIF)",
          description: "Experience the thrill of flying and see if aviation is right for you",
          details: "Single flight session • Perfect for beginners"
        },
        {
          title: "Recreational Pilots License (RPL)",
          description: "Your first step into becoming a licensed pilot",
          details: "20+ hours • Basic aviation fundamentals"
        },
        {
          title: "Private Pilots License (PPL)",
          description: "Expand your flying capabilities and fly for private purposes",
          details: "40+ hours • Advanced flight operations"
        }
      ]
    },
    {
      name: "Advanced Training",
      description: "Take your career to the next level with our professional pilot training programs.",
      icon: <Navigation className="w-5 h-5" />,
      content: [
        {
          title: "Commercial Pilots License (CPL)",
          description: "Non-Integrated pathway to becoming a professional pilot",
          details: "200+ hours • Professional aviation career"
        }
      ]
    },
    {
      name: "Design Feature Endorsements",
      description: "Specialized training for advanced aircraft systems and configurations.",
      icon: <Settings className="w-5 h-5" />,
      content: [
        {
          title: "Manual-Propeller Pitch Control",
          description: "Constant speed rating endorsement for advanced propeller control",
          details: "Specialized training • Technical competency"
        },
        {
          title: "Retractable Undercarriage",
          description: "Training for aircraft with retractable landing gear systems",
          details: "Specialized training • Technical competency"
        }
      ]
    }
  ];

  return (
    <section id="features" aria-label="Features" className="relative overflow-hidden bg-blue-600 pb-28 sm:py-32">
      <img
        alt=""
        loading="lazy"
        width="2245"
        height="1636"
        decoding="async"
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-80 rotate-360"
        src="/background-features.5f7a9ac9.jpg"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Flight Training Programs
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Professional pilot training programs designed to help you achieve your aviation dreams. From first flight to advanced certifications.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
            <div className="relative z-10 flex gap-x-4 px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal" role="tablist" aria-orientation="vertical">
              {features.map((feature, featureIndex) => (
                <div
                  key={feature.name}
                  className={`group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 ${
                    featureIndex === selectedTab
                      ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset"
                      : "hover:bg-white/10 lg:hover:bg-white/5"
                  }`}
                >
                  <h3>
                    <button
                      className={`font-display text-lg [&[data-state=selected]]:text-blue-600 lg:[&[data-state=selected]]:text-white ${
                        featureIndex === selectedTab
                          ? "text-blue-600 lg:text-white"
                          : "text-blue-100 hover:text-white lg:text-white"
                      }`}
                      role="tab"
                      type="button"
                      onClick={() => setSelectedTab(featureIndex)}
                      aria-selected={featureIndex === selectedTab}
                      data-state={featureIndex === selectedTab ? "selected" : ""}
                      data-headlessui-state={featureIndex === selectedTab ? "selected" : ""}
                      id={`headlessui-tabs-tab-${featureIndex}`}
                      aria-controls={`headlessui-tabs-panel-${featureIndex}`}
                    >
                      <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                      {feature.name}
                    </button>
                  </h3>
                  <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            {features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                role="tabpanel"
                id={`headlessui-tabs-panel-${featureIndex}`}
                aria-labelledby={`headlessui-tabs-tab-${featureIndex}`}
                tabIndex={featureIndex === selectedTab ? 0 : -1}
                data-headlessui-state={featureIndex === selectedTab ? "selected" : ""}
                style={{ display: featureIndex === selectedTab ? undefined : "none" }}
                hidden={featureIndex !== selectedTab}
                className="w-full"
              >
                <div className="relative sm:px-6 lg:hidden">
                  <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl"></div>
                  <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-10 w-full overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0">
                  <div className="p-8">
                    {feature.content.map((item, index) => (
                      <div key={index} className="flex gap-6 mb-8 last:mb-0">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600">
                          {feature.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                          <p className="mt-1 text-sm text-blue-600">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
