export class TreeNode {
  name: string;
  children: TreeNode[];
  weight: number;

  constructor(name: string) {
    this.name = name;
    this.children = [];
    this.weight = 0;
  }

  addChild(child: TreeNode): void {
    this.children.push(child);
  }
}
