export interface Hotspot {
  component: string;
  securityCategory: string;
  vulnerabilityProbability: string;
  line: number;
  message: string;
  ruleKey: string;
}

export interface HotspotsReport {
  hotspots: Hotspot[];
}

