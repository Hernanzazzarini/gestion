export const colorPorVencimiento = (fechaVencimiento) => {
    const hoy = new Date();
    const venc = new Date(fechaVencimiento);
    const diff = (venc - hoy) / (1000 * 60 * 60 * 24);
  
    if (diff < 0) return "table-danger";
    if (diff <= 30) return "table-warning";
    return "table-success";
  };
  