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
  title: {
    fontSize: 24, // Tailwind's text-2xl
    fontWeight: "semibold", // Tailwind's font-semibold
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "semibold", // Tailwind's font-semibold
  },
  table: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginBottom: 24, // Tailwind's mb-6
    borderWidth: 1,
    borderColor: "#000",
  },
  tableColumn: {
    width: "30%", // Corresponds to grid-cols-[30%_70%]
    borderWidth: 1,
    borderColor: "#000",
  },
  tableColumnContent: {
    width: "70%", // Corresponds to grid-cols-[30%_70%]
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    paddingVertical: 6, // Tailwind's py-2
    paddingHorizontal: 8, // Tailwind's px-6
    fontSize: 12, // Tailwind's text-base
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCellHeader: {
    paddingVertical: 6, // Tailwind's py-2
    paddingHorizontal: 8, // Tailwind's px-6
    fontSize: 12, // Tailwind's text-base
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
});

type PurchaseData = {
  date: Date;
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

const CustomReportPDF = (props: PurchaseOrderType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Relatório de Compra de Mercadorias -{" "}
          {`${String(props.purchaseData.date.getDate()).padStart(2, "0")}/${String(props.purchaseData.date.getMonth() + 1).padStart(2, "0")}/${String(props.purchaseData.date.getFullYear()).padStart(2, "0")}`}
        </Text>
        <Text style={styles.subtitle}>
          Responsável - {props.purchaseData.responsible}
        </Text>
      </View>
      {props.purchaseData.orderProducts.map((product, index) => (
        <View style={styles.table} key={index}>
          <View style={styles.tableColumn}>
            <Text style={styles.tableCellHeader}>Código</Text>
            <Text style={styles.tableCellHeader}>Nome</Text>
            <Text style={styles.tableCellHeader}>Fornecedor</Text>
            <Text style={styles.tableCellHeader}>Unidade de Compra</Text>
            <Text style={styles.tableCellHeader}>Quantidade de Compra</Text>
            <Text style={styles.tableCellHeader}>Estoque Atual</Text>
            <Text style={styles.tableCellHeader}>Estoque Mínimo</Text>
            <Text style={styles.tableCellHeader}>Endereço do Estoque</Text>
          </View>

          <View style={styles.tableColumnContent}>
            <Text style={styles.tableCell}>{product.code}</Text>
            <Text style={styles.tableCell}>{product.name}</Text>
            <Text style={styles.tableCell}>
              {product.ProductSupplier ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>{product.unit}</Text>
            <Text style={styles.tableCell}>
              {product.purchaseQuantity ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>{product.currentStock ?? 0}</Text>
            <Text style={styles.tableCell}>{product.minimunStock ?? 0}</Text>
            <Text style={styles.tableCell}>
              {`${product.stock}, ${product.cabinet}, ${product.shelf}`}
            </Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default CustomReportPDF;
