import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function UserDashboardLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Vous pouvez ajouter une barre latérale spécifique aux utilisateurs ici si nécessaire */}
      <div className={poppins.className}>
        {children}
      </div>
    </div>
  );
}