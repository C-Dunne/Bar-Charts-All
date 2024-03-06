class BarChart {
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

        //this.textFont = obj.textFont;
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
        let title = this.titleData.map(y => y);

        translate(0, (-this.chartWidth - this.titleHeight));
        fill(this.titleColour);
        textSize(this.titleSize);
        textAlign(CENTER, CENTER);
        noStroke();

        // title text variable
        let titleManifest = this.yValue + this.info + "by " + title[0];

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

        // legend Original 
        // push();
        //     fill(this.labelColour);
        //     noStroke();
        //     textSize(this.legendTextSize);
        //     textAlign(CENTER); 

        //     // legend text
        //     translate(this.chartHeight/2,100);
        //     text(title[1] + " Deaths", 0, 0);

        //     // rect for text
        //     fill(this.barColour);
        //     translate(-75,-this.legendTextSize + 1);
        //     rect(0,0,this.legendTextSize,this.legendTextSize);
        // pop();

        //gap width
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        // +1 to add an extra gap on right

        // get x axis label values
        let xLabels = this.data.map(d => d[this.xValue]);

        push(); // reset translation
        for (let i = 0; i < this.data.length; i++) {
            noStroke();

            // Draw bars
            fill(this.barColour);

                rect(gap, 0, this.barWidth, -this.data[i][this.yValue] * this.scale);
                // rect(x1,y1,x2,y2)
                // rect(xPos,yPos,width,height)

            // Draw x axis labels
            fill(this.labelColour);
            textAlign(LEFT);
            textSize(this.labelTextSize);

            push();
            translate(gap, 20);
            rotate(-this.labelRotation);
            text(xLabels[i], 0, 0);
            pop();

            //gap+barwidth = distance between each bar
            translate(gap + this.barWidth, 0);
        }
        pop();
        pop();
    }
}