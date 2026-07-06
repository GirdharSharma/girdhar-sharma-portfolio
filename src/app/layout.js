import "./globals.css";
import Sidebar from "@/components/Sidebar";
import NavRail from "@/components/NavRails";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata = {
  title: "Girdhar Sharma — Frontend Developer",
  description:
    "Frontend Developer specialising in React, Next.js & Node.js. Building fast, polished web experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-accent="green">
      <body>
        <ThemeProvider>
          {/* <Sidebar /> */}
          <NavRail />
          <main
          // style={{
          //   marginLeft: "500px",
          //   marginRight: "72px",
          //   minHeight: "100vh",
          // }}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
