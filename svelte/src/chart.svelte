<script>
    import { afterUpdate } from 'svelte';

    export let data;
    export let labels;
    let myChart;

    function createChart() {
        let ctx = document.getElementById('myChart');
        if (myChart) myChart.destroy();
        let colors = [];
        let highlight = [];
        labels.forEach((item) => {
            let r = Math.floor(Math.random() * 200);
            let g = Math.floor(Math.random() * 200);
            let b = Math.floor(Math.random() * 200);
            let v = Math.floor(Math.random() * 500);
            let c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
            let h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
            colors.push(c);
            highlight.push(h);
        });
        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data,
                    backgroundColor: colors,
                    highlight: highlight,
                }],
                labels,
                borderWidth: 1
            }
        });
    }
    afterUpdate(createChart);
</script>

<canvas id="myChart" width="360" height="280"></canvas>