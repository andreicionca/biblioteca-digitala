import supabase from "../supabaseClient";

// Obține toate cărțile, ordonate după ID
export async function getAllBooks(page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .order('id', { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching books:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}

// Obține cărțile ordonate după data de încărcare
export async function getBooksByDate(page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .order('upload_date', { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching books by date:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}

// // Obține toate categoriile unice:  are probleme 
// export async function getCategories() {
//   const { data, error } = await supabase
//     .from("books")
//     .select("categories")

//   if (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }

//   const uniqueCategories = [...new Set(data.map((item) => item.categories))];
//   return uniqueCategories;
// }

// Obține toate categoriile unice folosind RPC
export async function getCategories() {
  const { data, error } = await supabase.rpc('get_unique_categories');

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || []; // Returnăm direct array-ul JSON sau un array gol în caz de eroare
}

// Obține cărțile după categorie, sortate alfabetic după book
export async function getBooksByCategory(category, page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq('categories', category)
    .order('book', { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching books by category:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}

// Obține cele mai noi cărți pentru o categorie specifică
export async function getNewBooksByCategory(category, page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq('categories', category)
    .order('upload_date', { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching new books by category:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}


// Obține cărțile după literă și categorie
export async function getBooksByCategoryAndLetter(category, letter, page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq('categories', category)
    .ilike('book', `${letter}%`)
    .order('book', { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching books by category and letter:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}

// Obține cărți în ordine alfabetică după literă
export async function getBooksAlphabetical(letter, page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .ilike('book', `${letter}%`)
    .order('book', { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching books alphabetically:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}

// Căutare cărți după interogare
export async function searchBooks(query) {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike('book', `%${query}%`)

  if (error) {
    console.error("Error searching books:", error);
    return [];
  }

  return data;
}

