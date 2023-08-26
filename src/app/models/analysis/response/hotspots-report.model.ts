enum VulnerabilityProbability {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface HotspotsReport {
  hotspots: {
    component: string;
    securityCategory: string;
    vulnerabilityProbability: VulnerabilityProbability;
    line: number;
    message: string;
    ruleKey: string;
  }[];
}
