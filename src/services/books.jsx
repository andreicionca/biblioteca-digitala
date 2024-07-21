import supabase from "../supabaseClient";

export async function getBooks() {
  const { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Error fetching books:", error);
    return [];
  }
  return data;
}
