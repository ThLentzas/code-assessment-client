enum VulnerabilityProbability {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Hotspot {
  component: string;
  securityCategory: string;
  vulnerabilityProbability: VulnerabilityProbability;
  line: number;
  message: string;
  ruleKey: string;
}

export interface HotspotsReport {
  hotspots: Hotspot[];
}

