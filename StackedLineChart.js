class StackedLineChart {
    constructor(obj) {
        this.data = obj.data;
        this.titleData = obj.titleData;

        this.yValues = obj.yValues;
        this.xValue = obj.xValue;
        this.info = obj.info

        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;

        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        // move along x and y axis by Pos^

        //this.textFont = obj.textFont;

        this.title = obj.title;
        this.titleSize = obj.titleSize;
        this.titleColour = obj.titleColour;
        this.titleHeight = obj.titleHeight;

        this.numberTextSize = obj.numberTextSize;
        this.numberTextColour = obj.numberTextColour;
        this.numTicks = obj.numTicks;
        this.tickDecimalPlaces = obj.tickDecimalPlaces;

        this.axisLineColour = obj.axisLineColour;
        this.axisLineThickness = obj.axisLineThickness;

        this.lineThickness = obj.lineThickness;
        this.lineColour = obj.lineColour;

        this.labelRotation = obj.labelRotation;
        this.labelTextSize = obj.labelTextSize;
        this.labelColour = obj.labelColour;

        this.legendTextSize = obj.legendTextSize;
        this.legendTextColour = obj.legendTextColour;
        this.legendHeight = -obj.legendHeight;

        let maxValues= [];
        for (let y = 0; y < this.yValues.length; y++) {
        maxValues.push(max(this.data.map(d => d[this.yValues[y]])));
        }
        this.maxValue = max(maxValues.map(d => d));
        // this.maxValue = 24;

        this.scale = this.chartHeight / this.maxValue;
        // Scale by dividing chart height by the max value
    }

    render() {
        push();
        //chart lines, template
        translate(this.xPos, this.yPos + this.titleHeight);
        // move the chart according to the x and y Pos values + titleheight translation
        strokeWeight(this.axisLineThickness);
        stroke(this.axisLineColour);
        //strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        // line(x1,y1,x2,y2);

        angleMode(DEGREES); // to make rotations easier

        // title of chart
        push();
        let title = this.titleData.map(t => t);

        translate(0, (-this.chartWidth - this.titleHeight));
        fill(this.titleColour);
        textSize(this.titleSize);
        textAlign(CENTER, CENTER);
        noStroke();

        // title text variable
        let titleManifest;
        for (let y = 0; y < this.yValues.length; y++) {
        titleManifest = this.title + this.info + "by " + title[0];
        }
        text(titleManifest, 0, 0, this.chartWidth, this.titleHeight);
        pop();

        //line ticks + numbers
        for (let i = 0; i <= this.numTicks; i++) {
            push(); // reset translation for each time loop runs
            fill(this.numberTextColour);
            textAlign(RIGHT, CENTER);
            translate(0, i * (-this.chartHeight / this.numTicks));
            line(0, 0, -5, 0);
            let cascadeGap = this.maxValue / this.numTicks;
            // used to calculate number gap between the numbers on the axis
            noStroke();
            textSize(this.numberTextSize);
            // placed here so line still draws, only text has no stroke
            text((i * cascadeGap).toFixed(this.tickDecimalPlaces), -10, 0);
            pop();
        }

        // legend
        push();
        noStroke();
        textAlign(CENTER, TOP);

        for (let y = 0; y < this.yValues.length; y++) {
            let legendManifest = this.yValues[y] + this.info;

            // if (4 > y) {
                let split = this.chartWidth / this.yValues.length;

                textSize(this.legendTextSize);
                fill(StackColours[(y+4)]);

                text(" ■ " + legendManifest, split*y, this.titleHeight+this.legendHeight, split, this.titleHeight+this.legendHeight);

                textSize(this.legendTextSize);
                fill(this.legendTextColour);
                text("    " + legendManifest, split*y, this.titleHeight+this.legendHeight, split, this.titleHeight+this.legendHeight);
        }
        pop();

        // get x axis label values
        let xLabels = this.data.map(d => d[this.xValue]);

        // draw x axis labels
        push();
        translate((this.chartHeight / this.data.length),0);
        for (let i = 0; i < this.data.length; i++) {
            push(); // reset translation for each time loop runs
            fill(this.numberTextColour);

            translate(i * (this.chartHeight / this.data.length), 0);

            noStroke();
            fill(this.labelColour);
            textAlign(LEFT,TOP);
            textSize(this.labelTextSize);
            rotate(-this.labelRotation);
            
            text(xLabels[i], 20, 0);
            pop();
        }
        pop();

        push();
        translate((this.chartHeight / this.data.length), -this.chartWidth)
        for (let i = 0; i < this.data.length; i++) {
            let x = i + 1;
            let lineGap = this.chartWidth / this.data.length;
            
            if (x < this.data.length) {
                for (let y = 0; y < this.yValues.length; y++) {
                    stroke(StackColours[(y+4) % StackColours.length]);
                    strokeWeight(this.lineThickness);
                line(
                    (i) * lineGap,
                    this.chartWidth - (this.data[i][this.yValues[y]] * this.scale),
                    (x) *lineGap,
                    this.chartWidth - (this.data[x][this.yValues[y]] * this.scale)
                    );
                }
            }
        }
        pop();
        pop();
    }
}