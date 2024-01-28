import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BookingsByDate = () => {
  const [data, setData] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["1", "5", "10", "12", "15", "20", "23", "25", "29", "31"],
      },
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
          width={"100%"}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BookingsByDate;
