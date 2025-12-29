const cities = [
  { name: "北京", icon: "🌆" },
  { name: "天津", icon: "🏙️" },
  { name: "石家庄", icon: "🌃" },
  { name: "济南", icon: "🏢" },
  { name: "青岛", icon: "🌊" },
  { name: "南京", icon: "🏛️" },
  { name: "宁波", icon: "🌉" },
  { name: "合肥", icon: "🏮" },
  { name: "福州", icon: "🌸" },
  { name: "南昌", icon: "🏯" },
  { name: "郑州", icon: "🌺" },
  { name: "襄阳", icon: "🎋" },
  { name: "西安", icon: "🏔️" },
  { name: "成都", icon: "🐼" },
  { name: "绵阳", icon: "🏮" },
  { name: "重庆", icon: "🌉" },
  { name: "贵阳", icon: "🌸" },
  { name: "云南", icon: "🌺" },
  { name: "拉萨", icon: "🏔️" },
  { name: "乌鲁木齐", icon: "🕌" },
  { name: "兰州", icon: "🏛️" },
  { name: "西宁", icon: "🌄" },
  { name: "银川", icon: "🏜️" },
  { name: "山西", icon: "🏛️" },
];

export const CitiesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            全国服务网络
          </h2>
          <p className="text-muted-foreground">
            覆盖全国主要城市，提供专业的无人机定制服务
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {cities.map((city, index) => (
            <a
              key={index}
              href="#"
              className="group flex flex-col items-center p-4 bg-card rounded-xl shadow-sm hover:shadow-card-hover hover:bg-accent/5 transition-all duration-300"
            >
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {city.icon}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                {city.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
