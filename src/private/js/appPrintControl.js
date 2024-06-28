const btnPrint = document.querySelector('#btn_pdf');
const printArea = document.querySelector('#print_area');

btnPrint.addEventListener(
    'click', () => {
        let option = {
            margin: .6,
            filename: 'test',
            image: { type: 'png', quality: 0.95 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        html2pdf(printArea, option);
    }
);