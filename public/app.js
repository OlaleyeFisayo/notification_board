const socket = new WebSocket("ws://localhost:3001");
socket.addEventListener("open", () => {
  console.log("connected to WebSocket server");
});
socket.addEventListener("message", (event) => {
  console.log("received message from server", event.data);
});

// Display chart
const approvedRate = document.querySelector(".approved-rate");
const declinedRate = document.querySelector(".declined-rate");

const xValues = ["Approved", "Failed"];
const yValues = [
  Number(approvedRate.textContent.slice(0, 2)),
  Number(declinedRate.textContent.slice(0, 2)),
];
const barColors = ["#01821d", "#e70d0d"];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
});
