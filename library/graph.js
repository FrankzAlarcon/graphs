import cytoscape from 'cytoscape';

class GraphFronted {
  constructor() {
    this.graph = cytoscape({
      container: document.getElementById('graph'),
    
      layout: {
        name: 'grid',
        rows: 2,
        cols: 2
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#11aaff',
            "border-style": 'solid',
            "border-width": '2px',
            "border-color": '#88aaff',
            'label': 'data(id)',
          }
        },
    
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#000',
            'target-arrow-color': '#e60',
            'target-arrow-shape': 'triangle',
            'label': 'data(label)',
            'font-size': '14px',
            'color': '#000'
          }
        }
      ],
      elements: {
        nodes: [],
        edges: []
      }
    });
  }
  addNode(node) {
    this.graph.add({group: 'nodes',data: {id: node.username, name: node.name}, position: {x: Math.random()*600, y: Math.random()*400}})
  }
  addEdge(sourceNode, targetNode) {
    this.graph.add({group: 'edges', data: {id:`${sourceNode.username}-${targetNode.username}`, source: sourceNode.username, target: targetNode.username, label: targetNode.public_metrics.followers_count}})
  }
}

export default GraphFronted;