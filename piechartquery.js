      var data;
      $( document ).ready(function() 
      {
       $.ajax({url: "http://127.0.0.1:3000/first1", success: function(result)
       {
       console.log(result);
        data= result;
        // var margin = {top: 250, right: 500, bottom: 250, middle: 50};

        //  var width = 700 - margin.left - margin.right,
        //      height = 400 - margin.top - margin.bottom;
        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 4;
        
        var g = svg.append("g")
                   .attr("transform", "translate(" + width /2 + "," + height / 2.5+ ")");

        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

        var pie = d3.pie().value(function(d) { 
                return d.percentage; 
            });

        var path = d3.arc()
                     .outerRadius(radius - 10)
                     .innerRadius(0);

        var label = d3.arc()
                      .outerRadius(radius)
                      .innerRadius(radius - 80);

    
            var arc = g.selectAll(".arc")
                       .data(pie(data))
                       .enter().append("g")
                       .attr("class", "arc");

            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.payment_method); });
        
            console.log(arc)
        
            arc.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.payment_method; });
           

            svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 220) + "," + 30 + ")")
               .append("text")
               .text("Pie chart for different payment-methods")
               .attr("class", "title")
               .style("font","30px times")

            var tooltip = d3.select('g')                               // NEW
             .append('div')                                                // NEW
             .attr('class', 'tooltip');                                    // NEW
                      
              tooltip.append('text')                                           // NEW
               .attr('class', 'payment_method');                                      // NEW
             
              tooltip.append('text')                                           // NEW
               .attr('class', 'percentage');                                      // NEW

        // tooltip.append('div')                                           // NEW
        //   .attr('class', 'percent');                                    
                             
     }});
     });
    