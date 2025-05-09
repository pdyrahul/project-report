import '../styles/globals.scss';
import "react-loading-skeleton/dist/skeleton.css";
export const metadata = {
  title: 'Enago Research Papers',
  description: 'A frontend app to display research papers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
