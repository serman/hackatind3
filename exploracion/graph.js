appStatus={

}


var margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        },
        
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,

        padding = 2,
        maxRadius = 50,
        minRadius = 14,
        numberOfNodes = 14;



    svg = d3.select("svg#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("shape-rendering", "geometric-precision");




    d3.dsv(",", "https://gist.github.com/serman/a243be9efa57f9e952e1539f109f62e2", function(d) {
        //preproceso
    }).then(function(data) {
    })
