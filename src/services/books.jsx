import supabase from "../supabaseClient";

export async function getBooks(page = 1, limit = 3) {
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



export async function getCategories() {
  const { data, error } = await supabase
    .from("books")
    .select("categories");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const uniqueCategories = [...new Set(data.map((item) => item.categories))];
  return uniqueCategories;
}

export async function getBooksByCategory(category, page = 1, limit = 3) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq('categories', category)
    .order('id', { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching books by category:", error);
    return { books: [], totalCount: 0 };
  }

  return { books: data, totalCount: count };
}


export async function searchBooks(query) {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike('book', `%${query}%`);

  if (error) {
    console.error("Error searching books:", error);
    return [];
  }

  return data;
}