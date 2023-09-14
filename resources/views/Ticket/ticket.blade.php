<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ticket de compra</title>
    <style>
        * {
    font-size: 12px;
    font-family: 'Times New Roman';
}

td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}

.ticket {
    width: 155px;
    max-width: 155px;
}

img {
    max-width: inherit;
    width: inherit;
}
    </style>
</head>
<body>
    <div class="ticket">
        <table>
            <thead>
                <tr>
                    <th>CANT</th>
                    <th>PRODUCTO</th>
                    <th>$$</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1.00</td>
                    <td>CHEETOS VERDES 80 G</td>
                    <td>$8.50</td>
                </tr>
                <tr>
                    <td>2.00</td>
                    <td>KINDER DELICE</td>
                    <td>$10.00</td>
                </tr>
                <tr>
                    <td>1.00</td>
                    <td>COCA COLA 600 ML</td>
                    <td>$10.00</td>
                </tr>

                <tr>
                    <td></td>
                    <td>TOTAL</td>
                    <td>$28.50</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>