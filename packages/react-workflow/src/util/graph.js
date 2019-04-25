import dagre from 'dagre';

/**
 * Generate a DAG layout from a list of node relationships
 * @param {*} nodes An array of node objects, each with an `id` and optional
 * `needs` array
 * @returns An object containing `width`, `height`, a `nodes` object, and an
 * `edges` array. Note: x and y positions are 1-indexed (for use in CSS Grid)
 */
const generateGraphLayout = nodesArray => {
  const graphConfig = {
    rankdir: 'TB',
    align: 'UL',
    ranker: 'longest-path',
    nodesep: 0,
    ranksep: 0,
    edgesep: 0,
    marginx: -0.5,
    marginy: -0.5,
  };
  const nodeConfig = {
    width: 1,
    height: 1,
  };

  const dag = new dagre.graphlib.Graph();
  dag.setGraph(graphConfig);
  dag.setDefaultEdgeLabel(() => ({}));

  nodesArray.forEach(node => {
    dag.setNode(node.id, { label: node.id, ...nodeConfig, ...node });
    if (node.needs) node.needs.forEach(parent => dag.setEdge(parent, node.id));
  });

  dagre.layout(dag);
  const graph = dag.graph();
  const width = graph.width + 1;
  const height = graph.height + 1;

  const nodes = dag.nodes().reduce((nodesMap, id) => {
    const findNode = dag.node(id);
    if (!findNode) return nodesMap;
    const { label, x, y, ...node } = findNode;
    return {
      [id]: {
        id: label,
        x: Math.floor(x + 1),
        y: Math.floor(y + 1),
        ...node,
      },
      ...nodesMap,
    };
  }, {});
  const edges = dag.edges().map(edge => ({ start: edge.v, end: edge.w }));

  return {
    width,
    height,
    nodes,
    edges,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { generateGraphLayout };
