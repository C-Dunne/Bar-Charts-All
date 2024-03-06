class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.titleData = obj.titleData;
        this.yValue = obj.yValue;
        this.xValue = obj.xValue;

        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;

        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        // move along x and y axis by Pos^

        this.info = obj.info;
        this.titleSize = obj.titleSize;
        this.titleColour = obj.titleColour;
        this.titleHeight = obj.titleHeight;

        this.numberTextSize = obj.numberTextSize;
        this.numberTextColour = obj.numberTextColour;
        this.numTicks = obj.numTicks;
        this.tickDecimalPlaces = obj.tickDecimalPlaces;

        this.axisLineColour = obj.axisLineColour;
        this.axisLineThickness = obj.axisLineThickness;

        this.barWidth = obj.barWidth;
        this.barColour = obj.barColour;

        this.labelRotation = obj.labelRotation;
        this.labelTextSize = obj.labelTextSize;
        this.labelColour = obj.labelColour;

        this.legendTextSize = obj.legendTextSize;
        this.legendTextColour = obj.legendTextColour;
        this.legendHeight = -obj.legendHeight;

        this.maxValue = max(this.data.map(d => d[this.yValue]));
        // Get the max value from our data
        this.scale = this.chartWidth / this.maxValue;
        // Scale by dividing chart width by the max value
    }

    render() {
        push();
        //chart lines, template
        translate(this.xPos, this.yPos + this.titleHeight);
        // move the chart according to the x and y Pos values + titleheight translation
        strokeWeight(this.axisLineThickness);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        // line(x1,y1,x2,y2);

        angleMode(DEGREES); // to make rotations easier

        // title of chart
        push();
        let title = this.titleData.map(y => y);

        translate(0, (-this.chartWidth - this.titleHeight));
        fill(this.titleColour);
        textSize(this.titleSize);
        textAlign(CENTER, CENTER);
        noStroke();

        // title text variable
        let titleManifest = this.yValue + this.info +"by " + title[0];

        text(titleManifest, 0, 0, this.chartWidth, this.titleHeight);
        pop();

        //line ticks
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(-i * (-this.chartWidth / this.numTicks), 0);
            line(0, 0, 0, 5);
            pop();
        }

        // y axis numbers
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            noStroke();
            fill(this.numberTextColour);
            textSize(this.numberTextSize);
            textAlign(RIGHT, CENTER);
            translate(-i * (-this.chartWidth / this.numTicks) + 15, 20);
            let cascadeGap = this.maxValue / this.numTicks;
            text((i * cascadeGap).toFixed(this.tickDecimalPlaces), -10, 0);
            pop();
        }

        // legend
        noStroke();
        textSize(this.legendTextSize);
        textAlign(CENTER, BOTTOM);

        // create variable for our text display
        let legendManifest = this.yValue + this.info;

        // print our text inside a textbox
        push();
        fill(this.barColour);
        text(" ■ " + legendManifest, 0, this.titleHeight+this.legendHeight, this.chartWidth, this.titleHeight+this.legendHeight);
        pop();

        // print this to make only the text white
        push();
        fill(this.legendTextColour);
        text("    " + legendManifest, 0, this.titleHeight+this.legendHeight, this.chartWidth, this.titleHeight+this.legendHeight);
        pop();

        //gap width
        let gap = (this.chartHeight - (this.data.length * this.barWidth)) / (this.data.length+1);

        // get y axis label values
        let yLabels = this.data.map(d => d[this.xValue]);

        push();
        for (let i = 0; i < this.data.length; i++) {
            noStroke();

            // Draw Bars
            fill(this.barColour);
                rect(1, -gap-gap, this.data[i][this.yValue] * this.scale, this.barWidth);

            // Draw y axis labels
            fill(this.labelColour);
            textSize(this.labelTextSize);
            textAlign(RIGHT);

            push();
            translate(-20, -(gap));
            rotate(this.labelRotation);
            text(yLabels[i], 0, 0);
            pop()

            //gap+barwidth = distance between each bar
            translate(0, -(gap + this.barWidth))
        }
        pop();
        pop();
    }
}