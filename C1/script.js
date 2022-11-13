const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const offsetX = 50;
const offsetY = 50;

class Chart {
    constructor({title, data}){
        this.title = title;
        this.data = data;
        this.init();
    }

    init(){
        this.drawGraphLine();
        this.drawGraphIndicator();
        this.drawChartLine();
    }

    drawChartLine(){
        c.beginPath()
        c.strokeStyle = 'red';
        c.lineWidth = 3;
        this.data.forEach(obj => {
            c.lineTo(offsetX + obj.tanggal / this.maxTanggal * (canvas.width - offsetX*2), offsetY + (1 - obj.jumlah / this.maxJumlah) * (canvas.height - offsetY*2));
        });
        c.stroke()
        c.closePath();
    }

    drawGraphIndicator(){
        c.font = "10px Arial";

        c.fillText('Jumlah', offsetX - 20, offsetY - 20);
        const jumlah = this.data.map(d => d.jumlah);
        this.maxJumlah = Math.max(...jumlah);
        jumlah.forEach(j => {
            c.fillText(j, offsetX - 20, offsetY + (1 - j / this.maxJumlah) * (canvas.height - offsetY*2));
        });


        c.fillText('Tanggal', canvas.width - offsetX, canvas.height - offsetY - 20);
        const tanggal = this.data.map(d => d.tanggal);
        this.maxTanggal = Math.max(...tanggal);
        tanggal.forEach(t => {
            c.fillText(t, offsetX + t / this.maxTanggal * (canvas.width - offsetX*2), canvas.height - offsetY + 20);
        });

    }

    drawGraphLine(){
        c.strokeStyle = 'black';

        c.beginPath();
        c.moveTo(offsetX, offsetY);
        c.lineTo(offsetX, canvas.height - offsetY );
        c.stroke();
        c.closePath();


        c.beginPath();
        c.moveTo(offsetX, canvas.height - offsetY);
        c.lineTo(canvas.width - offsetX, canvas.height - offsetY );
        c.stroke();
        c.closePath();
    }

}


let chart = new Chart({
    title: "Data Covid Jakarta Oktober",
    data: [
        {
            tanggal: 1,
            jumlah: 13,
        },
        {
            tanggal: 2,
            jumlah: 20,
        },
        {
            tanggal: 3,
            jumlah: 70,
        },
        {
            tanggal: 4,
            jumlah: 40,
        },
        {
            tanggal: 5,
            jumlah: 60,
        },
        {
            tanggal: 6,
            jumlah: 20,
        },
        {
            tanggal: 7,
            jumlah: 50,
        },
        {
            tanggal: 8,
            jumlah: 30,
        },
    ]
})
