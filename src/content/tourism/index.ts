/**
 * Places shown on the travel map.
 *
 * Coordinates are checked in deliberately: the site never geocodes place
 * names during a build, so adding a city cannot silently resolve to the wrong
 * location. Coordinates use the [latitude, longitude] order expected by
 * Leaflet.
 */
export interface TourismPlace {
  name: string
  country: string
  countryCode: string
  coordinates: [latitude: number, longitude: number]
}

export const tourismPlaces: TourismPlace[] = [
  { name: 'Beijing', country: 'China', countryCode: 'CN', coordinates: [39.9042, 116.4074] },
  { name: 'Tianjin', country: 'China', countryCode: 'CN', coordinates: [39.0842, 117.2009] },
  { name: 'Shaoguan', country: 'China', countryCode: 'CN', coordinates: [24.8104, 113.5972] },
  { name: 'Guangzhou', country: 'China', countryCode: 'CN', coordinates: [23.1291, 113.2644] },
  { name: 'Shenzhen', country: 'China', countryCode: 'CN', coordinates: [22.5431, 114.0579] },
  { name: 'Zhuhai', country: 'China', countryCode: 'CN', coordinates: [22.2707, 113.5767] },
  { name: 'Heyuan', country: 'China', countryCode: 'CN', coordinates: [23.7437, 114.7009] },
  { name: 'Qingyuan', country: 'China', countryCode: 'CN', coordinates: [23.682, 113.056] },
  { name: 'Yingde', country: 'China', countryCode: 'CN', coordinates: [24.1857, 113.4054] },
  { name: 'Chenzhou', country: 'China', countryCode: 'CN', coordinates: [25.7705, 113.0147] },
  { name: 'Zhangjiajie', country: 'China', countryCode: 'CN', coordinates: [29.1171, 110.4792] },
  { name: 'Changsha', country: 'China', countryCode: 'CN', coordinates: [28.2282, 112.9388] },
  { name: 'Huizhou', country: 'China', countryCode: 'CN', coordinates: [23.1115, 114.4168] },
  { name: 'Yangjiang', country: 'China', countryCode: 'CN', coordinates: [21.8583, 111.9822] },
  { name: 'Hong Kong', country: 'China', countryCode: 'CN', coordinates: [22.3193, 114.1694] },
  { name: 'Chengdu', country: 'China', countryCode: 'CN', coordinates: [30.5728, 104.0668] },
  { name: 'Dujiangyan', country: 'China', countryCode: 'CN', coordinates: [30.9884, 103.6469] },
  { name: "Xi'an", country: 'China', countryCode: 'CN', coordinates: [34.3416, 108.9398] },
  { name: "Tai'an", country: 'China', countryCode: 'CN', coordinates: [36.2003, 117.0876] },
  { name: 'Jinan', country: 'China', countryCode: 'CN', coordinates: [36.6512, 117.1201] },
  { name: 'Wuhan', country: 'China', countryCode: 'CN', coordinates: [30.5928, 114.3055] },
  { name: 'Nanchang', country: 'China', countryCode: 'CN', coordinates: [28.682, 115.8579] },
  { name: 'Guilin', country: 'China', countryCode: 'CN', coordinates: [25.2742, 110.2991] },
  { name: 'Chongqing', country: 'China', countryCode: 'CN', coordinates: [29.563, 106.5516] },
  { name: 'Haikou', country: 'China', countryCode: 'CN', coordinates: [20.044, 110.1999] },
  { name: 'Sanya', country: 'China', countryCode: 'CN', coordinates: [18.2528, 109.5119] },
  { name: 'Datong', country: 'China', countryCode: 'CN', coordinates: [40.0768, 113.3001] },
  { name: 'Shanghai', country: 'China', countryCode: 'CN', coordinates: [31.2304, 121.4737] },
  { name: 'Suzhou', country: 'China', countryCode: 'CN', coordinates: [31.2989, 120.5853] },
  { name: 'Nanjing', country: 'China', countryCode: 'CN', coordinates: [32.0603, 118.7969] },
  { name: 'Zhengzhou', country: 'China', countryCode: 'CN', coordinates: [34.7466, 113.6254] },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR', coordinates: [37.5665, 126.978] }
]
