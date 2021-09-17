const ImageCharts = require('image-charts');
let cardPrice1 = [10000, 9500, 23000, 9000, 28000, 15000, 11500, 23000, 18000, 15000, 11500, 23000, 9000, 18000]
let cardPrice2 = [16000, 10500, 18000, 13000, 15000, 9000, 12500, 17000, 16000, 15000, 13500, 20000, 10000, 21000]
let pts =['01.09', '02.09', '03.09', '04.09', '05.09', '06.09', '07.09', '08.09', '09.09', '10.09', '11.09', '12.09', '13.09', '14.09']

class Charts {
    constructor(cardPrice1, cardPrice2, pts){
        this.cardPrice1 = cardPrice1;
        this.cardPrice2 = cardPrice2;
        this.pts = pts;
    }
    chart(cardPrice1, cardPrice2, pts) {
        const pie = ImageCharts()
        .cht('lc')
        .chd(`a:${this.cardPrice1}|${this.cardPrice2}`)
        .chdl('DNS|MVIDEO')
        // .chd('t:40,50,5')
        .chco('18DBFF,0000c2')
        .chs('800x400')
        .chg('20,50,4')
        // .chl(`${this.cardPrice1.join('|')}${this.cardPrice2.join('|')}`)
        .chxl(`0:|${this.pts.join('|')}`)
        .chxs('1N*s*')
        .chxt('x,y')
        ;
        pie.toFile('./statistic/chart.png'); // Promise<()>
        
    }

}

const a = new Charts(cardPrice1, cardPrice2, pts)
a.chart();
console.log(pts.join('|'));