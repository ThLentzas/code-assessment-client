import {Injectable} from "@angular/core";
import {TreeNode} from "../models/analysis/request/tree-node.model";


@Injectable({
  providedIn: "root"
})
export class TreeService {

  buildTree(): TreeNode {
    const root = new TreeNode("Rank");
    const quality = new TreeNode("QUALITY");
    const security = new TreeNode("SECURITY");
    const comprehension = new TreeNode("COMPREHENSION");
    const simplicity = new TreeNode("SIMPLICITY");
    const maintainability = new TreeNode("MAINTAINABILITY");
    const reliability = new TreeNode("RELIABILITY");
    const complexity = new TreeNode("COMPLEXITY");
    const commentRate = new TreeNode("COMMENT_RATE");
    const methodSize = new TreeNode("METHOD_SIZE");
    const duplication = new TreeNode("DUPLICATION");
    const bugSeverity = new TreeNode("BUG_SEVERITY");
    const technicalDebtRatio = new TreeNode("TECHNICAL_DEBT_RATIO");
    const reliabilityRemediationEffort = new TreeNode("RELIABILITY_REMEDIATION_EFFORT");
    const cyclomaticComplexity = new TreeNode("CYCLOMATIC_COMPLEXITY");
    const cognitiveComplexity = new TreeNode("COGNITIVE_COMPLEXITY");
    const vulnerabilitySeverity = new TreeNode("VULNERABILITY_SEVERITY");
    const hotSpotPriority = new TreeNode("HOTSPOT_PRIORITY");
    const securityRemediationEffort = new TreeNode("SECURITY_REMEDIATION_EFFORT");

    this.addChildren(root, [quality, security]);
    this.addChildren(quality, [comprehension, simplicity, maintainability, reliability, complexity]);
    this.addChildren(security, [vulnerabilitySeverity, hotSpotPriority, securityRemediationEffort]);
    this.addChildren(comprehension, [commentRate]);
    this.addChildren(simplicity, [methodSize]);
    this.addChildren(maintainability, [duplication, technicalDebtRatio]);
    this.addChildren(reliability, [bugSeverity, reliabilityRemediationEffort]);
    this.addChildren(complexity, [cyclomaticComplexity, cognitiveComplexity]);

    return root;
  }

  private addChildren(parent: TreeNode, children: TreeNode[]) {
    for (const child of children) {
      parent.addChild(child);
    }
  }
}
