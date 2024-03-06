let barCharts = [];
let data;
let titleData;
let cleanData = [];
let stackedData = [];
let columnData = [];
let numRows;
let numColumns;
let fullScale = 4;
let StackColours = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"];
//array with a list of colours

let fontLight;
let fontReg;
let fontBold;

function preload() {
    data = loadTable("data/Test1.csv", "csv", "header");
    fontLight = loadFont('Fonts/Montserrat-Light.ttf');
    fontReg = loadFont('Fonts/Montserrat-Regular.ttf');
    fontBold = loadFont('Fonts/Montserrat-Bold.ttf');
}

function setup() {
    background(50)
    createCanvas(windowWidth, windowHeight+50);

    numRows = data.rows.length; // get number of rows from our data's length
    numColumns = data.columns.length; // get number of rows from our data's length

    for (let i = 0; i < numRows; i++) {
        let row = data.rows[i];
        let rowData = {}; // create an object to store row data
        for (let columnName of data.columns) {
            rowData[columnName] = columnName === 'Region' ? row.get(columnName) : parseFloat(row.get(columnName)); // Convert numeric values to numbers
        }
        stackedData.push(rowData);
    }

    for (let i = 0; i < numRows; i++) {
        cleanData.push(data.rows[i].obj)
    } // loop for pushing row data into a new array

    for (let i = 0; i < numColumns; i++) {
        columnData.push(data.columns[i])
    }

    console.log(cleanData);
    console.log(columnData);

    let BarChart01 = {
        data: cleanData,
        titleData: columnData,
        yValue: "Male Adults",
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200,
        yPos: 600,

        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 100,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "#75c7d9",
        axisLineThickness: 3,

        barWidth: 30,
        barColour: "#e60049",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: 30, // titleHeight-50
    }

    let BarChart02 = {
        data: cleanData,
        titleData: columnData,
        yValue: "Female Adults",
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200 + 900,
        yPos: 600,

        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 100,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        barWidth: 30,
        barColour: "#0bb4ff",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: 50, // titleHeight-50
    }

    let BarChart03 = {
        data: cleanData,
        titleData: columnData,
        yValue: "Number of Families",
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200,
        yPos: 600 + 875,

        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 75,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        circleWidth: 12.5,
        circleColour: "#50e991",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: 10, // titleHeight-50
    }

    let BarChart04 = {
        data: stackedData,
        titleData: columnData,
        yValues: ["Adults Aged 18-24","Adults Aged 25-44","Adults Aged 45-64","Adults Aged 65+"],
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200 +900,
        yPos: 600 + 875,

        title: "Adults Aged 18-65+",
        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 70,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        barWidth: 30,
        barColour: "green",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: -20, // titleHeight-50
    }

    let BarChart05 = {
        data: cleanData,
        titleData: columnData,
        yValue: "Number of Single-Parent families",
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200 +900 +900,
        yPos: 600,

        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 100,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        lineThickness: 3,
        lineColour: "#e6d800",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: 15,  //titleHeight-50
    }

    let BarChart06 = {
        data: cleanData,
        titleData: columnData,
        yValues: ["Adults Aged 18-24","Adults Aged 25-44","Adults Aged 45-64","Adults Aged 65+"],
        xValue: "Region",

        chartHeight: 600,
        chartWidth: 600,
        xPos: 200 + 900 +900,
        yPos: 600 + 875,

        title: "Adults Aged 18-65+",
        info: " Unhoused ",
        titleSize: 30,
        titleColour: "white",
        titleHeight: 70,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        lineThickness: 3,
        lineColour: "#e6d800",

        labelRotation: -45,
        labelTextSize: 15,
        labelColour: "#eaeacd",

        legendTextSize: 25,
        legendTextColour: "white",
        legendHeight: -20,// titleHeight-50
    }

    let BarChart07 = {
        data: cleanData,
        titleData: columnData,
        yValues: ["Total Adults","Male Adults","Female Adults","Adults Aged 18-24","Adults Aged 65+"],
        xValue: "Region",

        chartHeight: 650,
        chartWidth: 650,
        xPos: 150 + 850 + 850 +850,
        yPos: 675,

        title: "Adults Aged 18-65+",
        info: " Unhoused ",
        titleSize: 30,
        titleColour: "blue",
        titleHeight: 75,

        numberTextSize: 15,
        numberTextColour: "red",
        numTicks: 9,
        tickDecimalPlaces: 1,

        axisLineColour: "white",
        axisLineThickness: 3,

        lineThickness: 3,
        lineColour: "#e6d800",

        labelRotation:-45,
        labelTextSize: 10,
        labelColour: "white",

        legendTextSize: 15,
        legendTextColour: "purple",
        legendHeight: 0, // titleHeight-75
    }

    barCharts.push(new BarChart(BarChart01));
    barCharts.push(new HorizontalBarChart(BarChart02));
    barCharts.push(new PlotChart(BarChart03));
    barCharts.push(new StackedChart(BarChart04));
    barCharts.push(new LineChart(BarChart05));
    barCharts.push(new StackedLineChart(BarChart06));
    //barCharts.push(new StackedLineChart(BarChart07));

    textFont(fontBold);
}

function draw() {
    background("#171717");
    barCharts.forEach(bar => bar.render())
}

