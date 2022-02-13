import cytoscape from 'cytoscape';
// import getDataAPI from './getData';
// import getData from './getTwitterData';

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
        nodes: [
          // { data: { id: 'j', name: 'Jerry' } },
          // { data: { id: 'e', name: 'Elaine' } },
          // { data: { id: 'k', name: 'Kramer' } },
          // { data: { id: 'g', name: 'George' } },
          // { data: { id: 'f', name: 'Frankz' } }
        ],
        edges: [
          // { data: { source: 'j', target: 'e', label: '7' } },
          // { data: { source: 'j', target: 'k',label: '7' } },
          // { data: { source: 'j', target: 'g',label: '7' } },
          // { data: { source: 'e', target: 'j', label: '7' } },
          // { data: { source: 'e', target: 'k',label: '7' } },
          // { data: { source: 'k', target: 'j',label: '7' } },
          // { data: { source: 'k', target: 'e',label: '7' } },
          // { data: { source: 'k', target: 'g',label: '7' } },
          // { data: { source: 'g', target: 'j',label: '7' } },
          // { data: { source: 'g', target: 'f',label: '19' } }
        ]
      }
    });
    // this.length = 0;
  }
  addNode(node) {
    this.graph.add({group: 'nodes',data: {id: node.username, name: node.name}, position: {x: Math.random()*600, y: Math.random()*400}})
  }
  addEdge(sourceNode, targetNode) {
    // { group: 'edges',data: { id: 'e1', source: 'n2', target: 'n3', label: 10 } },
    this.graph.add({group: 'edges', data: {id:`${sourceNode.username}-${targetNode.username}`, source: sourceNode.username, target: targetNode.username, label: targetNode.public_metrics.followers_count}})
  }
}

export default GraphFronted;