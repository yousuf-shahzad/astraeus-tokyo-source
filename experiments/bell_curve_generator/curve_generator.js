function generateGradeBoundaries(marks, numGrades) {
    marks.sort((a, b) => a - b);
    const percentiles = [];
    for (let i = 0; i <= numGrades; i++) {
        percentiles.push(marks[Math.floor(i * marks.length / numGrades)]);
    }
    return percentiles;
}
