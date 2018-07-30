export class HeatMapInputData {
  hourCapacityMap: Map<string, number> = new Map<string, number>();
  stopCapacityMap: Map<string, number> = new Map<string, number>();


  returnHeatMapData() {
    const data: HeatMapItem[] = [];
    const averageRate: number = this.getAverageHourRate();

    for (const itemHourCapacityMap of Object.entries(this.hourCapacityMap)) {
      data.push(new HeatMapItem(itemHourCapacityMap[0], this.newSeries(averageRate, itemHourCapacityMap[1])));
    }
    return data;
  }

  newSeries(averageRate: number, value: number): SeriesItem[] {
    const series: SeriesItem[] = [];
    for (const item of Object.entries(this.stopCapacityMap)) {
      series.push(new SeriesItem(item[0], item[1] * this.safeDivision(value, averageRate)));
    }
    return series;
  }

  private getAverageHourRate(): number {
    let averageRate: number;
    for (const value of Object.entries(this.hourCapacityMap)) {
      averageRate = averageRate = value[1];
    }
    return averageRate;
  }

  private safeDivision(divided: number, divider: number): number {
    if (divider === 0) {
      return 0;
    } else {
      return divided / divider;
    }

  }
}

export class HeatMapItem {
  name: string;
  series: SeriesItem[] = [];

  constructor(name: string, series: SeriesItem[]) {
    this.name = name;
    this.series = series;
  }
}

export class SeriesItem {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
