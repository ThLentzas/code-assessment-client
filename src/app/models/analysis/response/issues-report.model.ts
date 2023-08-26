enum Severity {
  BLOCKER,
  CRITICAL,
  MAJOR,
  MINOR,
  INFO
}

export interface IssuesReport {
  issues: {
    rule: string;
    severity: Severity;
    component: string;
    project: string;
    line: number;
    message: string;
    type: string;
    flows: {
      locations: {
        textRange: {
          startLine: number;
          endLine: number;
          startOffset: number;
          endOffset: number;
        };
        msg: string;
      }[];
    }[];
    textRange: {
      startLine: number;
      endLine: number;
      startOffset: number;
      endOffset: number;
    };
  }[];
}
