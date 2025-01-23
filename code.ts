// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.

// Common types and functions
type PositionedNode = FrameNode | InstanceNode | ComponentNode | RectangleNode | 
  EllipseNode | PolygonNode | StarNode | LineNode | TextNode | GroupNode |
  // FigJam types
  ShapeWithTextNode | StampNode | StickyNode | ConnectorNode;

type NodeWithPosition = {
  node: PositionedNode;
  center: { x: number, y: number };
};

function getCenterPosition(node: PositionedNode): { x: number, y: number } {
  if ('absoluteBoundingBox' in node && node.absoluteBoundingBox) {
    const bounds = node.absoluteBoundingBox;
    return {
      x: Math.round((bounds.x + bounds.width/2) * 10) / 10,
      y: Math.round((bounds.y + bounds.height/2) * 10) / 10
    };
  }
  
  // Fallback for FigJam nodes without absoluteBoundingBox
  return {
    x: Math.round(node.x * 10) / 10,
    y: Math.round(node.y * 10) / 10
  };
}

function isPositionedNode(node: SceneNode): node is PositionedNode {
  return ('absoluteBoundingBox' in node || 'x' in node) && 
         !node.name.startsWith('###');
}

function numberToLetters(n: number): string {
  let letters = '';
  while (n > 0) {
    n--;
    letters = String.fromCharCode(65 + (n % 26)) + letters;
    n = Math.floor(n / 26);
  }
  return letters;
}

// Shared message handler
function handleRename(msg: any) {
  const { prefix, suffixType, autoDetect, rows, columns } = msg;
  const nodes = figma.currentPage.selection.filter(isPositionedNode);

  if (nodes.length === 0) {
    figma.notify('Please select positionable elements');
    figma.closePlugin();
    return;
  }

  // Create position-sorted array with center coordinates
  const nodesWithPosition: NodeWithPosition[] = nodes.map(node => ({
    node,
    center: getCenterPosition(node)
  })).sort((a, b) => 
    a.center.y - b.center.y || 
    a.center.x - b.center.x
  );

  let groupedRows: NodeWithPosition[][] = [];
  let usingAutoDetect = autoDetect;
  const ROW_TOLERANCE = 10;

  // Auto detection logic
  if (usingAutoDetect) {
    let currentRow: NodeWithPosition[] = [];
    let previousCenterY: number | null = null;

    for (const item of nodesWithPosition) {
      if (previousCenterY === null || 
          Math.abs(item.center.y - previousCenterY) > ROW_TOLERANCE) {
        if (currentRow.length > 0) groupedRows.push(currentRow);
        currentRow = [item];
        previousCenterY = item.center.y;
      } else {
        currentRow.push(item);
      }
    }
    if (currentRow.length > 0) groupedRows.push(currentRow);

    if (groupedRows.some(row => row.length === 0)) {
      usingAutoDetect = false;
      figma.ui.postMessage({ type: 'switch-to-manual' });
    }
  }

  // Manual fallback
  if (!usingAutoDetect) {
    const manualRows = Math.max(1, Number(rows) || 1);
    const manualCols = Math.max(1, Number(columns) || 1);
    
    if (manualRows * manualCols !== nodes.length) {
      figma.notify(`Elements count (${nodes.length}) doesn't match grid size (${manualRows}x${manualCols})`);
      return;
    }

    groupedRows = [];
    for (let i = 0; i < nodesWithPosition.length; i += manualCols) {
      groupedRows.push(nodesWithPosition.slice(i, i + manualCols));
    }
  }

  // Rename elements
  const orderedNodes = groupedRows.reduce((acc: PositionedNode[], row) => {
    return acc.concat(row.sort((a, b) => a.center.x - b.center.x).map(item => item.node));
  }, []);

  orderedNodes.forEach((node, index) => {
    const suffix = suffixType === 'number' 
      ? (index + 1).toString() 
      : numberToLetters(index + 1);
    
    if (figma.editorType === 'figjam') {
      // FigJam uses title property
      if ('title' in node) {
        node.title = `${prefix}${suffix}`;
      }
    } else {
      // Figma uses name property
      node.name = `${prefix}${suffix}`;
    }
  });
  
  figma.notify('Elements renamed successfully!');
  figma.closePlugin();
}

// Main plugin code
figma.showUI(__html__);

if (figma.editorType === 'figjam') {
  // FigJam-specific node handling
  figma.ui.onmessage = async (msg: any) => {
    if (msg.type === 'rename') {
      handleRename(msg);
    }
  };
} else {
  // Figma-specific node handling
  figma.ui.onmessage = async (msg: any) => {
    if (msg.type === 'rename') {
      handleRename(msg);
    }
  };
}