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
    marginBottom: 24, // Tailwind's mb-2
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

type CustomReportData = {
  date: string;
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

type CustomReportType = {
  customReportData: CustomReportData;
};

const CustomReportPDF = (props: CustomReportType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>
          Relatório de Produtos -{" "}
          {`${String(new Date()?.getDate()).padStart(2, "0")}/${String(new Date()?.getMonth()).padStart(2, "0")}/${String(new Date()?.getFullYear()).padStart(2, "0")}`}
        </Text>
      </View>
      {props.customReportData.products.map((product, index) => (
        <View style={styles.table} key={index}>
          <View style={styles.tableColumn}>
            <Text style={styles.tableCellHeader}>Código</Text>
            <Text style={styles.tableCellHeader}>Nome</Text>
            <Text style={styles.tableCellHeader}>Fornecedores</Text>
            <Text style={styles.tableCellHeader}>Status</Text>
            <Text style={styles.tableCellHeader}>Produto Pai</Text>
            <Text style={styles.tableCellHeader}>Unidade de Compra</Text>
            <Text style={styles.tableCellHeader}>Quantidade de Compra</Text>
            <Text style={styles.tableCellHeader}>Dia de Compra</Text>
            <Text style={styles.tableCellHeader}>Estoque Atual</Text>
            <Text style={styles.tableCellHeader}>Estoque Mínimo</Text>
            <Text style={styles.tableCellHeader}>Estoque Máximo</Text>
            <Text style={styles.tableCellHeader}>Tipo de Controle</Text>
            <Text style={styles.tableCellHeader}>Categoria do Produto</Text>
            <Text style={styles.tableCellHeader}>Setor de Utilização</Text>
            <Text style={styles.tableCellHeader}>Endereço do Estoque</Text>
            <Text style={styles.tableCellHeader}>Usuários com Permissão</Text>
          </View>

          <View style={styles.tableColumnContent}>
            <Text style={styles.tableCell}>{product.code}</Text>
            <Text style={styles.tableCell}>{product.name}</Text>
            <Text style={styles.tableCell}>
              {product.ProductSupplierName.length > 0
                ? product.ProductSupplierName.join(", ")
                : "Sem fornecedores informados"}
            </Text>
            <Text style={styles.tableCell}>{product.status}</Text>
            <Text style={styles.tableCell}>
              {product.parentProductName ?? "Não tem produto pai"}
            </Text>
            <Text
              style={styles.tableCell}
            >{`${product.unit.name} - ${product.unit.abbreviation} (${product.unit.unitsPerPack})`}</Text>
            <Text style={styles.tableCell}>
              {product.buyQuantity ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
              {product.buyDay ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>{product.currentStock ?? 0}</Text>
            <Text style={styles.tableCell}>{product.minimunStock ?? 0}</Text>
            <Text style={styles.tableCell}>{product.maximumStock ?? 0}</Text>
            <Text style={styles.tableCell}>
              {product.controlTypeName ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
              {product.categoryName ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
              {product.sectorOfUseName ?? "Não informado"}
            </Text>
            <Text style={styles.tableCell}>
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

export default CustomReportPDF;
