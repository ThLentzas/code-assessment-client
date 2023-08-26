export interface RuleDetails {
  rule: {
    key: string;
    name: string;
    severity: string;
    descriptionSections: {
      key: string;
      content: string;
    }[];
  };
}
