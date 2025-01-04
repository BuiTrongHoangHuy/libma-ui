export function formatCurrency(amount) {
    const numberPrice = Number(amount);
    return numberPrice.toLocaleString("en-US");
}