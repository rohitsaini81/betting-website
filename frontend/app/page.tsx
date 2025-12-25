export default function Home() {
  const results = [
    { name: "JAY BHOLE", time: "01:15 AM", yesterday: "08", today: "01" },
    { name: "BIKANER SUPER", time: "02:20 AM", yesterday: "17", today: "33" },
    { name: "DESAWER", time: "05:00 AM", yesterday: "34", today: "19" },
    { name: "PROFIT BAZZAR", time: "11:55 AM", yesterday: "84", today: "87" },
    { name: "HYDERABAD DAY", time: "12:30 PM", yesterday: "14", today: "50" },
    { name: "YAMUNA CITY", time: "01:10 PM", yesterday: "50", today: "05" },
    { name: "KUWAIT CITY", time: "01:30 PM", yesterday: "50", today: "51" },
    { name: "A1 SADAR BAZAR", time: "01:30 PM", yesterday: "59", today: "63" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center px-4 py-6">
      <HeroSection/>
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">SATTA KING</h1>
        <p className="text-sm text-slate-500">
          Yesterday And Today Result
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-semibold text-slate-800">
                  {item.name}
                </h2>
                <p className="text-xs text-slate-500">
                  Time: {item.time}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-400">Yesterday</span>
                  <span className="text-lg font-bold text-slate-700">
                    {item.yesterday}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-400">Today</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {item.today}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export function HeroSection() {
  const navItems = [
    { label: "SATTA KING", active: true },
    { label: "RECORD CHART" },
    { label: "SATTA CHART" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      
      {/* Navbar */}
      <div className="w-full flex justify-center px-3 pt-3">
        <div className="w-full max-w-6xl flex gap-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition
                ${
                  item.active
                    ? "bg-blue-700"
                    : "bg-blue-900/70 hover:bg-blue-800"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="w-full flex flex-col items-center text-center px-4 py-6 gap-3">
        <p className="text-sm tracking-wide text-slate-300">
          SUPER FAST KING LIVE RESULT
        </p>

        <p className="text-yellow-400 font-bold text-lg">
          www.11satta.in
        </p>

        <p className="text-xs text-slate-300 max-w-3xl">
          DELHI SATTA KING LIVE TODAYS RESULT
        </p>

        {/* Marquee-style text (static, clean version) */}

        <div className="w-full max-w-5xl bg-blue-900/60 rounded-md px-3 py-2 text-xs text-slate-200">
         <marquee>
          <b>SATTA KING, SATTA KING RECORD, SATTA KING RECORD CHART,PATNA CITY SATTA CHART, SATTA KING ONLINE RESULT, JAY BHOLE  SATTA  ,
   
   BIKANER SUPER SATTA  ,
   
   DESAWER SATTA  ,
   
   PROFIT BAZZAR SATTA  ,
   
   HYDERABAD DAY SATTA  ,
   
   YAMUNA  CITY SATTA  ,
   
   A1 SADAR BAZAR SATTA  ,
   
   KUWAIT CITY SATTA  ,
   
   MIRZAPUR SATTA  ,
   
   DELHI SATTA SATTA  ,
   
   CHANDIGARH CITY SATTA  ,
   
   RAJSHREE SATTA  ,
   
   NEW GAJIYABAD SATTA  ,
   
   HR KING SATTA  ,
   
   JAY  LAXMI SATTA  ,
   
   ALWAR BAJAR SATTA  ,
   
   NEW  TAJ  CHHOTU SATTA  ,
   
   DELHI BAZAR SATTA  ,
   
   AHMEDABAD SATTA  ,
   
   PALAMPUR (PP) SATTA  ,
   
   SHREE GANESH SATTA  ,
   
   KOHINOOR SATTA  ,
   
   FARIDABAD SATTA  ,
   
   DUBAI SATTA SATTA  ,
   
   PARAS SATTA  ,
   
   HYDERABAD  GOLD SATTA  ,
   
   MALAMAL BAZAR SATTA  ,
   
   PUSHKAR SATTA  ,
   
   UP MATKA SATTA  ,
   
   HYDERABAD SATTA  ,
   
   GHAZIABAD SATTA  ,
   
   BHAGYA SHREE SATTA  ,
   
   DS KING SATTA  ,
   
   CHAR MINAR SATTA  ,
   
   HAMJAPUR SATTA  ,
   
   SUPER PANJAB SATTA  ,
   
   GALI SATTA  ,
   
       SATTA KING FAST</b>
</marquee>        </div>

        {/* Online badge */}
        <span className="mt-2 inline-block bg-indigo-400 text-white text-xs px-3 py-1 rounded-full">
          3 ONLINE
        </span>
      </div>

      {/* Live Result Box */}
      <div className="w-full flex justify-center px-3 pb-6">
        <div className="w-full max-w-5xl rounded-xl border-2 border-emerald-500 bg-black/90 px-4 py-6 flex flex-col items-center gap-3">
          
          <p className="text-yellow-400 text-sm font-semibold">
            25-12-2025 09:01:51 PM
          </p>

          <p className="text-xs text-slate-300">
            डायरेक्ट सट्टा-किंग कंपनी से रिजल्ट देखने के लिए रुके रहिये
          </p>

          <p className="text-emerald-400 text-xl font-bold">
            HYDERABAD
          </p>

          <p className="text-yellow-400 text-2xl font-extrabold">
            73
          </p>

          <p className="text-emerald-400 text-xl font-bold">
            GHAZIABAD
          </p>

          <p className="text-yellow-400 text-lg font-semibold">
            Wait
          </p>
        </div>
      </div>
    </section>
  );
}
