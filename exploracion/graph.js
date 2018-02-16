d3.text("lista.csv", function(d) {
    //preproceso
}).then(function(text) {
    var SOURCE = "28065"
    lista = d3.csvParse(text);
    listaFiltrada = lista.filter(function(el) {
        return el["residencia"] == SOURCE ? true : false;
    })
    listaOrdenada = listaFiltrada.sort(function(a, b) {
        return (+b.trabajadores) - (+a.trabajadores)
    })
    links = [];
    for (var i = 0; i < listaOrdenada.length; i++) {
        links.push({
            source: SOURCE,
            target: listaOrdenada[i].trabajo,
            value: +listaOrdenada[i].trabajadores
        })
    }

    var i, j, node;
    var groupSep = 10;

    var nodeRadius = d3.scaleSqrt().range([3, 7]);

     linkWidth = d3.scaleLinear().range([1,10]);

    var margin = {
        top: 20,
        right: 40,
        bottom: 40,
        left: 40
    };

     width = 960 - margin.left - margin.right;
     height = 500 - margin.top - margin.bottom;

    var codigos=listaOrdenada.map(function(d){return d.trabajo + ''});

     x = d3.scalePoint()
    .range([ 0, width])
    .domain(codigos)
    //.clamp(true)

    var svg = d3.select("svg#chart")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    var idToNode = {};
    graph=
    {links:links,
        nodes:listaOrdenada
    }


    nodeRadius.domain(d3.extent(graph.nodes, function(d) {
        return d.trabajadores;
    }));

    linkWidth.domain(d3.extent(graph.links, function(d) {
        return d.value;
    }));

    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('path')
        .data(graph.links)
        .enter().append('path')
        .attr('d', function(d) {
            return ['M', x(d.source), height, 'A',
                    (x(d.source) - x(d.target)) / 2, ',',
                    (x(d.source) - x(d.target)) / 2, 0, 0, ',',
                    x(d.source) < x(d.target) ? 1 : 0, x(d.target), ',', height
                ]
                .join(' ');
        })
        .attr('stroke-width', function(d) {
            return linkWidth(d.value);
        })
        .on('mouseover', function(d) {
            link.style('stroke', null);
            d3.select(this).style('stroke', '#d62333');
            node.style('fill', function(node_d) {
                return node_d === d.source || node_d === d.target ? 'black' : null;
            });

            svg.append('text')
                .attr('class', 'ttpid')
                .attr('x', 10)
                .attr('y', 30)
                .text(d.value + ' a ' + d.target )
        })
        .on('mouseout', function(d) {
            link.style('stroke', null);
            node.style('fill', null);
            svg.select('.ttpid').remove()
        });

    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
        .attr('cx', function(d) {
            return x(d.trabajo);
        })
        .attr('cy', function(d) {
            return height;
        })
        .attr('r', function(d) {
            return nodeRadius(d.trabajadores);
        })
        .on('mouseover', function(d) {
            node.style('fill', null);
            d3.select(this).style('fill', 'black');
            svg.append('text')
                .attr('class', 'ttpid')
                .attr('x', 10)
                .attr('y', 10)
                .text(d.trabajo)
        })
        .on('mouseout', function(d) {
            node.style('fill', null);
            link.style('stroke', null);

            svg.select('.ttpid').remove()
        });




})
