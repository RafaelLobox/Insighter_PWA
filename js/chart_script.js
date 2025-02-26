var options1 = {
  chart: {
    id: "chart2",
    type: "area",
    height: 230,
    foreColor: "#000524",
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#3540E6"],
  stroke: {
    width: 3,
  },
  grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  markers: {
    size: 5,
    colors: ["#fff"],
    strokeColor: "#25E6B1", 
    strokeWidth: 3,
  },
  Temperatura: [],
  tooltip: {
    theme: "light",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
  },
};

var options2 = {
  chart: {
    id: "chart2",
    type: "area",
    height: 230,
    foreColor: "#000524",
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#3540E6"],
  stroke: {
    width: 3,
  },
  grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  markers: {
    size: 5,
    colors: ["#fff"],
    strokeColor: "#25E6B1",
    strokeWidth: 3,
  },
  series: [],
  tooltip: {
    theme: "light",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
  },
};

var options3 = {
  chart: {
    id: "chart2",
    type: "area",
    height: 230,
    foreColor: "#000524",
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#3540E6"],
  stroke: {
    width: 3,
  },
  grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  markers: {
    size: 5,
    colors: ["#fff"],
    strokeColor: "#25E6B1",
    strokeWidth: 3,
  },
  series: [],
  tooltip: {
    theme: "light",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
  },
};

function updateChart(chartOption, dataSeries) {
  chartOption.series = [
    {
      data: dataSeries,
    },
  ];
  return chartOption;
}

function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max + 20 - (yrange.min - 10) + 1)) +
      yrange.min;
    // TODO mudar o valor da condição para uma variavel MAX/MIN
    if (y > yrange.max || y < yrange.min) {
      series.push({ x: x, y: y, strokeColor: "#EC2F2F" });
    } else {
      series.push({ x: x, y: y });
    }
    baseval += 600000;
    i++;
  }

  return series;
}

const toggleMenuOpen = () => {
  document.body.classList.toggle("open");
};

var data_temp = generateDayWiseTimeSeries(
  new Date("21 oct 2022").getTime(),
  20,
  {
    min: 30,
    max: 90,
  }
);
updateChart(options1, data_temp);

var chart4 = new ApexCharts(
  document.querySelector("#chart-area-temp-home"),
  options1
);

chart4.render();

function getSingleData(id) {
  fetch(`https://retoolapi.dev/2PlLEF/data/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw Error("OOPS, SOMETHING WENT WRONG. :(");
      }
      return response.json();
    })
    .then((data) => {
      document
        .querySelector("#machine_name")
        .insertAdjacentHTML("afterbegin", data.machineName);
      var data_temp = generateDayWiseTimeSeries(
        new Date("21 oct 2022").getTime(),
        20,
        {
          min: data.tempMin,
          max: data.tempMax,
        }
      );
      updateChart(options1, data_temp);

      var data_noise = generateDayWiseTimeSeries(
        new Date("21 oct 2022").getTime(),
        20,
        {
          min: data.noiseMin,
          max: data.noiseMax,
        }
      );
      updateChart(options2, data_noise);

      var data_vib = generateDayWiseTimeSeries(
        new Date("21 oct 2022").getTime(),
        20,
        {
          min: data.vibMin,
          max: data.vibMax,
        }
      );
      updateChart(options3, data_vib);

      var chart1 = new ApexCharts(
        document.querySelector("#chart-area-temp"),
        options1
      );
      var chart2 = new ApexCharts(
        document.querySelector("#chart-area-noise"),
        options2
      );
      var chart3 = new ApexCharts(
        document.querySelector("#chart-area-vib"),
        options3
      );

      chart1.render();
      chart2.render();
      chart3.render();
    })
    .catch((error) => {
      console.log(error);
    });
}
function init() {
  const url = new URL(window.location.href);
  const machineId = url.searchParams.get("machineId");
  getSingleData(machineId);
}
init();
