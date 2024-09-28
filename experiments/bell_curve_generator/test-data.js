const testDataSets = [
    {
        name: "Small class, normal distribution",
        maxScore: 100,
        minScore: 0,
        data: [65, 70, 75, 80, 82, 85, 87, 90, 92, 95]
    },
    {
        name: "Large class, normal distribution",
        maxScore: 100,
        minScore: 0,
        data: [60, 62, 65, 67, 70, 72, 75, 76, 78, 80, 82, 83, 85, 86, 88, 90, 91, 92, 94, 95, 97, 98, 100]
    },
    {
        name: "Skewed distribution (lower scores)",
        maxScore: 100,
        minScore: 0,
        data: [40, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 75, 80, 85]
    },
    {
        name: "Skewed distribution (higher scores)",
        maxScore: 100,
        minScore: 0,
        data: [70, 75, 80, 82, 85, 87, 88, 90, 91, 92, 93, 95, 96, 97, 98]
    },
    {
        name: "Bimodal distribution",
        maxScore: 100,
        minScore: 0,
        data: [40, 45, 48, 50, 52, 55, 75, 78, 80, 82, 85, 87, 90, 92, 95]
    }
];

function loadTestData(index) {
    const set = testDataSets[index];
    document.getElementById('mxscore').value = set.maxScore;
    document.getElementById('mnscore').value = set.minScore;
    document.getElementById('input_list').value = set.data.join(',');
}