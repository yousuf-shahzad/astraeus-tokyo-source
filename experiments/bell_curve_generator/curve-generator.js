function generateGradeBoundaries(marks, numGrades) {
    marks.sort((a, b) => a - b);
    const percentiles = [];
    for (let i = 0; i <= numGrades; i++) {
        percentiles.push(marks[Math.floor(i * marks.length / numGrades)]);
    }
    return percentiles;
}

function createCurve(data, mxscore, mnscore, numGrades) {
    const maxInputMarks = parseInt(mxscore);
    const inputMarks = data.map(Number);
    const multiplier = 100 / maxInputMarks;
    const marks = inputMarks.map(mark => mark * multiplier);
    
    const mean = math.mean(marks);
    const stdDev = math.std(marks);
    
    const x = math.range(math.min(marks), 100, 0.1).toArray();
    const y = x.map(xi => math.exp(-0.5 * Math.pow((xi - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI)));
    
    const gradeBoundaries = generateGradeBoundaries(marks, numGrades);
    
    const traces = [{
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'Bell Curve',
        line: {color: 'black', dash: 'dash'}
    }];
    
    const colors = ['darkred', 'red', 'orange', 'yellow', 'yellowgreen', 'lime', 'cyan'];
    for (let i = 2; i < gradeBoundaries.length; i++) {
        const boundary = gradeBoundaries[i] / multiplier;
        traces.push({
            x: [boundary, boundary],
            y: [0, Math.max(...y)],
            type: 'scatter',
            mode: 'lines',
            line: {color: 'black', dash: 'dash'},
            showlegend: false
        });
        
        const fillX = x.filter(xi => xi <= boundary && xi > (gradeBoundaries[i-1] / multiplier));
        const fillY = fillX.map(xi => math.exp(-0.5 * Math.pow((xi * multiplier - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI)));
        traces.push({
            x: fillX,
            y: fillY,
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: colors[i-2],
            line: {width: 0},
            name: `Grade ${i+1}`
        });
    }
    
    const layout = {
        title: 'Bell Curve for Student Marks',
        xaxis: {title: 'Marks', range: [math.min(marks) / multiplier, maxInputMarks]},
        yaxis: {showticklabels: false},
        showlegend: true
    };
    
    Plotly.newPlot('curveChart', traces, layout);
}

document.getElementById('curveForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mxscore = document.getElementById('mxscore').value;
    const mnscore = document.getElementById('mnscore').value;
    const inputList = document.getElementById('input_list').value;
    
    if (!mxscore || !mnscore || !inputList) {
        document.getElementById('errorMessage').textContent = 'Please fill in all the forms.';
        return;
    }
    
    const data = inputList.split(',').map(Number);
    if (data.some(isNaN)) {
        document.getElementById('errorMessage').textContent = 'The input marks are not in the correct format.';
        return;
    }
    
    document.getElementById('errorMessage').textContent = '';
    createCurve(data, mxscore, mnscore, 7);
});