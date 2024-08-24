import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        "500": "500",
      },
      colors: {
        fundo_branco: "#F2F2F2",
        fundo_sidebar: "#15191E",

        placeholder_input: "#ADB5BD",
        borda_input: "#DEE2E6",
        borda_tabela: "#DDDDDD",

        fundo_tabela_destaque: "#E9E9E9", // Linhas das tabelas alternam entre essa cor e fundo_branco
        filtro: "#D6DBD8", // Fundo de filtros
        cinza_destaque: "#DEDEDE", // Botão detalhes, inputs em tabelas
        hover_cinza_destaque: "#D0D0D0",
        cinza_escuro_botao: "#2D3648", // Talvez algum botão

        fundo_titulo_relatorio: "#ADB5BD",
        fundo_destaque_relatorio: "#DEDEDE",

        vermelho_escuro_strategis: "#622631",
        vinho_strategis: "#420D0A",
        vermelho_strategis: "#FF3228", // Logo, Destaque sidebar, etc
        vermelho_botao_1: "#D01F30", // Botões de forms (ex: remover usuário)
        vermelho_botao_2: "#C43D3D", // Botões de tabelas (ex: gerar relatório)
        hover_vermelho_botao: "#C21828",

        azul_dashboard: "#007BFF",
        azul_botao: "#3F90EF", // Botões de forms e tabelas
        hover_azul_botao: "#3A82D1",

        amarelo_dashboard: "#FFC107",
        amarelo_botao: "#BAA803", // Botões de forms (ex: editar usuário)
        amarelo_status: "#FFE872", // Botões de forms e solicitações (ex: criar usuário, confirmar)
        hover_amarelo_botao: "#948302",

        verde_dashboard: "#28A745",
        verde_botao: "#28A745", // Botões de forms e solicitações (ex: criar usuário, confirmar)
        verde_status: "#B7EDAE", // Botões de forms e solicitações (ex: criar usuário, confirmar)
        hover_verde_botao: "#218838",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
