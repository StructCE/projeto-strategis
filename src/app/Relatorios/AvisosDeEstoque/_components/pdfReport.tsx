import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  title: {
    fontSize: 24, // Tailwind's text-2xl
    fontWeight: "semibold", // Tailwind's font-semibold
    marginBottom: 4, // Tailwind's mb-2
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "medium", // Changed weight to medium for contrast
    color: "#333333", // Lighter color for the subtitle
    marginBottom: 12, // Increased bottom margin for spacing
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

type StockWarningsReportData = {
  date: Date;
  company: string | undefined;
  products: {
    code: string;
    name: string;
    ProductSupplierName: string[];
    status: string;
    parentProductName: string;
    unit: { name: string; abbreviation: string; unitsPerPack: number };
    buyQuantity: number;
    buyDay: string;
    currentStock: number;
    minimunStock: number;
    maximumStock: number;
    controlTypeName: string;
    categoryName: string;
    sectorOfUseName: string;
    stockName: string;
    cabinetName: string;
    shelfName: string;
    usersWithPermissionNames: string[];
  }[];
};

type StockWarningsReportType = {
  stockWarningsReportData: StockWarningsReportData;
};

const StockWarningsReportPDF = (props: StockWarningsReportType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>
          Relatório de Produtos -{" "}
          {`${String(props.stockWarningsReportData.date?.getDate()).padStart(2, "0")}/${String(props.stockWarningsReportData.date?.getMonth()).padStart(2, "0")}/${String(props.stockWarningsReportData.date?.getFullYear()).padStart(2, "0")}`}
        </Text>
      </View>
      {props.stockWarningsReportData.company ? (
        <View style={styles.subtitle}>
          <Text>Empresa: {props.stockWarningsReportData.company}</Text>
        </View>
      ) : (
        <></>
      )}
      {props.stockWarningsReportData.products.map((product, index) => (
        <View style={styles.table} key={index}>
          <View style={styles.tableColumn}>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Código
            </Text>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Nome
            </Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Fornecedores
            </Text>
            <Text style={styles.tableCellHeader}>Status</Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Produto Pai
            </Text>
            <Text style={styles.tableCellHeader}>Unidade de Compra</Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Quantidade de Compra
            </Text>
            <Text style={styles.tableCellHeader}>Dia de Compra</Text>
            <Text
              style={[
                styles.tableCellHeader,
                { backgroundColor: "#dedede", fontWeight: "bold" },
              ]}
            >
              Estoque Atual
            </Text>
            <Text style={styles.tableCellHeader}>Estoque Mínimo</Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Estoque Máximo
            </Text>
            <Text style={styles.tableCellHeader}>Tipo de Controle</Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Categoria do Produto
            </Text>
            <Text style={styles.tableCellHeader}>Setor de Utilização</Text>
            <Text
              style={[styles.tableCellHeader, { backgroundColor: "#dedede" }]}
            >
              Endereço do Estoque
            </Text>
            <Text style={styles.tableCellHeader}>Usuários com Permissão</Text>
          </View>

          <View style={styles.tableColumnContent}>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.code}
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              {product.name}
            </Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.ProductSupplierName.length > 0
                ? product.ProductSupplierName.join(", ")
                : "Sem fornecedores informados"}
            </Text>
            <Text style={styles.tableCell}>{product.status}</Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.parentProductName ?? "Não tem produto pai"}
            </Text>
            <Text
              style={styles.tableCell}
            >{`${product.unit.name} - ${product.unit.abbreviation} (${product.unit.unitsPerPack})`}</Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.buyQuantity ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
              {product.buyDay ?? "Não informado"}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { backgroundColor: "#dedede", fontWeight: "bold" },
              ]}
            >
              {product.currentStock ?? 0}
            </Text>
            <Text style={styles.tableCell}>{product.minimunStock ?? 0}</Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.maximumStock ?? 0}
            </Text>
            <Text style={styles.tableCell}>
              {product.controlTypeName ?? "Não informado"}
            </Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {product.categoryName ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
              {product.sectorOfUseName ?? "Não informado"}
            </Text>
            <Text style={[styles.tableCell, { backgroundColor: "#dedede" }]}>
              {`${product.stockName}, ${product.cabinetName}, ${product.shelfName}`}
            </Text>
            <Text style={styles.tableCell}>
              {product.usersWithPermissionNames.length > 0
                ? product.usersWithPermissionNames.join(", ")
                : "Sem usuários com permissão"}
            </Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default StockWarningsReportPDF;
