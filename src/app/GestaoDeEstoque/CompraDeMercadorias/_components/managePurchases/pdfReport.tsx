import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  titleView: {
    marginBottom: 24,
  },
  subtitleView: {
    flexDirection: "row",
    gap: 32,
    justifyContent: "center", // Centered subtitle
  },
  title: {
    fontSize: 28,
    fontWeight: "bold", // Changed to bold for a stronger appearance
    color: "#2C3E50", // Darker color for the title
    marginBottom: 4, // Reduced margin for a tighter look
    textAlign: "center", // Centered title
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "medium", // Changed weight to medium for contrast
    color: "#7F8C8D", // Lighter color for the subtitle
    marginBottom: 12, // Increased bottom margin for spacing
    textAlign: "center", // Centered subtitle
  },
  table: {
    width: "100%",
    borderColor: "#000",
    marginBottom: 24,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
    backgroundColor: "#bfbfbf",
    display: "flex",
    alignItems: "center",
    // textAlign:"center"
  },
  tableCell: {
    fontSize: 12,
    padding: 6,
  },
  // Define column styles directly here
  columnSmall: { width: "5%" },
  columnNarrow: { width: "10%" },
  columnMedium: { width: "20%" },
  columnWide: { width: "25%" },
});

type PurchaseData = {
  date: Date;
  company: string;
  responsible: string;
  orderProducts: {
    code: string;
    name: string;
    unit: string;
    currentStock: number | null;
    minimunStock: number | null;
    purchaseQuantity: number | null;
    ProductSupplier: string;
    stock: string | undefined;
    cabinet: string | undefined;
    shelf: string | undefined;
  }[];
};

type PurchaseOrderType = {
  purchaseData: PurchaseData;
};

const columns = [
  { title: "Cód.", style: styles.columnSmall },
  { title: "Produto", style: styles.columnMedium },
  { title: "Quantidade em Estoque", style: styles.columnNarrow },
  { title: "Estoque Mínimo", style: styles.columnNarrow },
  { title: "Unidade", style: styles.columnNarrow },
  { title: "Quantidade a Comprar (unidade)", style: styles.columnNarrow },
  { title: "Quantidade a Comprar (fardo)", style: styles.columnNarrow },
  { title: "Fornecedor", style: styles.columnWide },
];

const CustomReportPDF = (props: PurchaseOrderType) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Relatório de Compra de Mercadorias -{" "}
          {`${String(props.purchaseData.date.getDate()).padStart(2, "0")}/${String(props.purchaseData.date.getMonth() + 1).padStart(2, "0")}/${String(props.purchaseData.date.getFullYear()).padStart(2, "0")}`}
        </Text>

        <View style={styles.subtitleView}>
          <Text style={styles.subtitle}>
            Empresa - {props.purchaseData.company}
          </Text>
          <Text style={styles.subtitle}>
            Responsável - {props.purchaseData.responsible}
          </Text>
        </View>
      </View>

      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          {columns.map((col, index) => (
            <Text key={index} style={[col.style, styles.tableCellHeader]}>
              {col.title}
            </Text>
          ))}
        </View>

        {/* Data Rows */}
        {props.purchaseData.orderProducts.map((product, index) => (
          <View
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "white" : "#dedede" }, // Alternate row color
            ]}
            key={index}
          >
            <Text style={[styles.columnSmall, styles.tableCell]}>
              {product.code}
            </Text>
            <Text style={[styles.columnMedium, styles.tableCell]}>
              {product.name}
            </Text>
            <Text style={[styles.columnNarrow, styles.tableCell]}>
              {product.currentStock ?? 0}
            </Text>
            <Text style={[styles.columnNarrow, styles.tableCell]}>
              {product.minimunStock ?? 0}
            </Text>
            <Text style={[styles.columnNarrow, styles.tableCell]}>
              {product.unit}
            </Text>
            <Text style={[styles.columnNarrow, styles.tableCell]}>
              {product.purchaseQuantity ?? 0}
            </Text>
            <Text style={[styles.columnNarrow, styles.tableCell]}>
              {product.purchaseQuantity ?? 0}
            </Text>
            <Text style={[styles.columnWide, styles.tableCell]}>
              {product.ProductSupplier ?? "Não informado"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CustomReportPDF;
