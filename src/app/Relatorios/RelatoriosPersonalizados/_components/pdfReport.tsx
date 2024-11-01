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

type CustomReportData = {
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

type CustomReportType = {
  customReportData: CustomReportData;
  selectReportOptions: string[];
};

const CustomReportPDF = (props: CustomReportType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>
          Relatório de Produtos -{" "}
          {`${String(props.customReportData.date?.getDate()).padStart(2, "0")}/${String(props.customReportData.date?.getMonth()).padStart(2, "0")}/${String(props.customReportData.date?.getFullYear()).padStart(2, "0")}`}
        </Text>
      </View>
      {props.customReportData.company ? (
        <View style={styles.subtitle}>
          <Text>Empresa: {props.customReportData.company}</Text>
        </View>
      ) : (
        <></>
      )}
      {props.customReportData.products.map((product, index) => (
        <View style={styles.table} key={index}>
          <View style={styles.tableColumn}>
            {props.selectReportOptions.includes("Código") ? (
              <Text style={styles.tableCellHeader}>Código</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Nome") ? (
              <Text style={styles.tableCellHeader}>Nome</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Fornecedores") ? (
              <Text style={styles.tableCellHeader}>Fornecedores</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Status") ? (
              <Text style={styles.tableCellHeader}>Status</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Produto Pai") ? (
              <Text style={styles.tableCellHeader}>Produto Pai</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Unidade de Compra") ? (
              <Text style={styles.tableCellHeader}>Unidade de Compra</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Quantidade de Compra") ? (
              <Text style={styles.tableCellHeader}>Quantidade de Compra</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Dia de Compra") ? (
              <Text style={styles.tableCellHeader}>Dia de Compra</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Atual") ? (
              <Text style={styles.tableCellHeader}>Estoque Atual</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Mínimo") ? (
              <Text style={styles.tableCellHeader}>Estoque Mínimo</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Máximo") ? (
              <Text style={styles.tableCellHeader}>Estoque Máximo</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Tipo de Controle") ? (
              <Text style={styles.tableCellHeader}>Tipo de Controle</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Categoria do Produto") ? (
              <Text style={styles.tableCellHeader}>Categoria do Produto</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Setor de Utilização") ? (
              <Text style={styles.tableCellHeader}>Setor de Utilização</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Endereço do Estoque") ? (
              <Text style={styles.tableCellHeader}>Endereço do Estoque</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Usuários com Permissão") ? (
              <Text style={styles.tableCellHeader}>Usuários com Permissão</Text>
            ) : (
              <></>
            )}
          </View>

          <View style={styles.tableColumnContent}>
            {props.selectReportOptions.includes("Código") ? (
              <Text style={styles.tableCell}>{product.code}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Nome") ? (
              <Text style={styles.tableCell}>{product.name}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Fornecedores") ? (
              <Text style={styles.tableCell}>
                {product.ProductSupplierName.length > 0
                  ? product.ProductSupplierName.join(", ")
                  : "Sem fornecedores informados"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Status") ? (
              <Text style={styles.tableCell}>{product.status}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Produto Pai") ? (
              <Text style={styles.tableCell}>
                {product.parentProductName ?? "Não tem produto pai"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Unidade de Compra") ? (
              <Text
                style={styles.tableCell}
              >{`${product.unit.name} - ${product.unit.abbreviation} (${product.unit.unitsPerPack})`}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Quantidade de Compra") ? (
              <Text style={styles.tableCell}>
                {product.buyQuantity ?? "Não informado"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Dia de Compra") ? (
              <Text style={styles.tableCell}>
                {product.buyDay ?? "Não informado"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Atual") ? (
              <Text style={styles.tableCell}>{product.currentStock ?? 0}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Mínimo") ? (
              <Text style={styles.tableCell}>{product.minimunStock ?? 0}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Estoque Máximo") ? (
              <Text style={styles.tableCell}>{product.maximumStock ?? 0}</Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Tipo de Controle") ? (
              <Text style={styles.tableCell}>
                {product.controlTypeName ?? "Não informado"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Categoria do Produto") ? (
              <Text style={styles.tableCell}>
                {product.categoryName ?? "Não informado"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Setor de Utilização") ? (
              <Text style={styles.tableCell}>
                {product.sectorOfUseName ?? "Não informado"}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Endereço do Estoque") ? (
              <Text style={styles.tableCell}>
                {`${product.stockName}, ${product.cabinetName}, ${product.shelfName}`}
              </Text>
            ) : (
              <></>
            )}

            {props.selectReportOptions.includes("Usuários com Permissão") ? (
              <Text style={styles.tableCell}>
                {product.usersWithPermissionNames.length > 0
                  ? product.usersWithPermissionNames.join(", ")
                  : "Sem usuários com permissão"}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default CustomReportPDF;
