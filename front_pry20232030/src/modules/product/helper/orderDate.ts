/* eslint-disable @typescript-eslint/no-explicit-any */
export function orderDate(arr: any[]) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

    // Función para comparar objetos por año y luego por mes
    function compararAnioYMes(a: { year: string; month: string; }, b: { year: string; month: string; }) {
        const anioA = parseInt(a.year);
        const anioB = parseInt(b.year);
        const mesA = meses.indexOf(a.month);
        const mesB = meses.indexOf(b.month);

        if (anioA < anioB) return -1;
        if (anioA > anioB) return 1;
        if (mesA < mesB) return -1;
        if (mesA > mesB) return 1;
        return 0;
    }

    // Ordenar el arreglo por año y luego por mes
    arr.sort(compararAnioYMes);

    return arr;
}