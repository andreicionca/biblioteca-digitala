function Suggestions() {
  const getFormatButtonStyle = (format) => {
    switch (format) {
      case 'PDF':
        return 'bg-red-500';
      case 'DOC':
        return 'bg-blue-500';
      case 'EPUB':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="font-figtree text-light-2 md:text-lg">
            <h2 className="text-3xl font-semibold mb-2 text-brand-1 md:pb-6 md:text-center">Formate de cărți și alte recomandări</h2>

      <p className="mb-4">
        Pe acest site poți găsi cărți în trei formate populare:
        <span className={`px-2 py-1 rounded-full text-white ${getFormatButtonStyle('PDF')} ml-1`}>PDF</span>,
        <span className={`px-2 py-1 rounded-full text-white ${getFormatButtonStyle('DOC')} ml-1`}>DOC</span> și
        <span className={`px-2 py-1 rounded-full text-white ${getFormatButtonStyle('EPUB')} ml-1`}>EPUB</span>.
        Fiecare format are avantajele sale, însă pentru o experiență de citit optimă pe dispozitive mobile, 
        recomandăm utilizarea formatului <strong>EPUB</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-brand-1">De ce EPUB?</h2>
      <p className="mb-4">
        Formatul <strong className="text-purple-500">EPUB</strong> este optimizat pentru dispozitive mobile, permițând textului să se redimensioneze și 
        să se alinieze automat, oferindu-ți o lectură confortabilă și plăcută.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-brand-1">Aplicații recomandate</h2>
      <p className="mb-2">
        <strong className="text-brand-2">ReadEra</strong> este o aplicație gratuită și ușor de utilizat, compatibilă cu formatul de carte electronică <strong className="text-purple-500">EPUB</strong>, dar și cu alte formate, 
        inclusiv <strong className="text-red-500">PDF</strong> și <strong className="text-blue-500">DOC</strong>. Oferă funcționalități utile, cum ar fi marcaje, notițe și moduri de citire personalizate.
      </p>
      <p className="mb-4">
        Alternativ, poți folosi <strong className="text-light-3">Google Play Books</strong> pentru a sincroniza automat progresul lecturii între dispozitive, 
        adnotări și căutare în text.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-brand-1">Avantajele formatului EPUB</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Compatibilitate excelentă cu diverse dispozitive și aplicații de citit.</li>
        <li>Text redimensionabil pentru o experiență de citit mai confortabilă.</li>
        <li>Suport pentru imagini și ilustrații de înaltă calitate.</li>
        <li>Funcționalități avansate precum adnotări, marcaje și moduri de citire personalizate.</li>
      </ul>

      <p className="mb-4">
        Îți dorim lectură plăcută!
      </p>
    </div>
  );
}

export default Suggestions;
