document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    var vega_config = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "data": {"url": "https://raw.githubusercontent.com/serman/hackatind3/master/data/municipalities_data_cluster_y_tasas.csv"},
      "mark": "point",
      "encoding": {
        "x": {
          "field": "tasa_movilidad","type": "quantitative",
          "scale": {"zero": false}
        },
        "y": {"field": "renta-bruta-media","type": "quantitative"}, 
        "color": {"field": "Cluster" }},
      "width": "500",
      "height": "500"
    }


    vegaEmbed("#vis", vega_config);


    // Event handlers
    $("[data-name='var-selector']").change(function(e){

      var new_var = e.target.value;
      vega_config.encoding.y.field = e.target.value;

      vegaEmbed("#vis", vega_config);
    }); 
  }
};