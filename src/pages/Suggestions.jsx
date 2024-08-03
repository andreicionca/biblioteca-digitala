function Suggestions() {
  return (
    <div className="font-figtree text-light-2 md:text-lg md:leading-loose">
      <h2 className="text-3xl font-semibold mb-2 text-brand-1 md:pb-6 md:text-center">Formate de cărți</h2>
      <p className="mb-4">
        Pe acest site poți găsi cărți în trei formate populare: <strong className="text-white">PDF</strong>, <strong className="text-white">DOC</strong> și <strong className="text-white">EPUB</strong>.
      </p>
      <p className="mb-4">
        <span className="px-2 py-1 rounded-full text-white bg-red-500 ml-1">PDF</span> Ideal pentru păstrarea formatului original al documentului, util pentru citirea pe computere și tablete.
      </p>
      <p className="mb-4">
        <span className="px-2 py-1 rounded-full text-white bg-blue-500 ml-1">DOC</span> Ușor de editat, ideal pentru studii și adăugarea de notițe.
      </p>
      <p className="mb-4">
        <span className="px-2 py-1 rounded-full text-white bg-purple-500 ml-1">EPUB</span> Optim pentru dispozitive mobile, deoarece textul se redimensionează și se aliniază automat, oferindu-ți o lectură confortabilă și plăcută.
      </p>
      <p className="mb-4">
        Fiecare format are avantajele sale, însă pentru o experiență de citit optimă pe dispozitive mobile, 
        recomandăm utilizarea cărților în format EPUB.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-brand-1 md:text-center md:mt-16">Aplicații recomandate pentru citirea cărților digitale</h2>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-4">
          <strong className="text-brand-2">ReadEra</strong>: O aplicație gratuită și ușor de utilizat, compatibilă cu formatul de carte electronică <strong className="text-white">EPUB</strong>, dar și cu alte formate, 
          inclusiv <strong className="text-white">PDF</strong> și <strong className="text-white">DOC</strong>. Oferă funcționalități utile, cum ar fi:
          <ul className="list-disc list-inside">
            <li>Marcaje</li>
            <li>Notițe</li>
            <li>Moduri de citire personalizate</li>
          </ul>
          Disponibilă pentru descărcare pe <span className="text-green-500">Google Play Store</span> și <span className="text-blue-500">App Store</span>.
        </li>
        <li className="mb-4">
          <strong className="text-brand-2">Google Play Books</strong>: O alternativă excelentă care permite sincronizarea automată a progresului lecturii între dispozitive, adnotări și căutare în text. Această aplicație oferă următoarele funcționalități:
          <ul className="list-disc list-inside">
            <li>Sincronizare automată a progresului de lectură între dispozitive</li>
            <li>Posibilitatea de a adăuga adnotări și marcaje</li>
            <li>Funcție de căutare în text</li>
            <li>Interfață prietenoasă și ușor de utilizat</li>
            <li>Acces la o vastă bibliotecă de cărți disponibile pentru cumpărare sau descărcare gratuită</li>
          </ul>
          Disponibilă pentru descărcare pe <span className="text-green-500">Google Play Store</span> și <span className="text-blue-500">App Store</span>.
        </li>
        <li className="mb-4">
          <strong className="text-brand-2">Aquile Reader</strong>: Dacă folosești Windows și cauți o aplicație pentru citirea cărților în format <strong className="text-white">EPUB</strong>, îți recomandăm Aquile Reader. Aceasta oferă:
          <ul className="list-disc list-inside">
            <li>Interfață prietenoasă și ușor de utilizat</li>
            <li>Posibilitatea de a organiza biblioteca de cărți</li>
            <li>Funcții avansate de căutare și marcaje</li>
          </ul>
          Disponibilă pentru descărcare pe <span className="text-blue-500">Microsoft Store</span>.
        </li>
      </ol>

      <p className="mb-4 text-light-3 font-semibold">
        Îți dorim lectură plăcută!
      </p>
    </div>
  );
}

export default Suggestions;
