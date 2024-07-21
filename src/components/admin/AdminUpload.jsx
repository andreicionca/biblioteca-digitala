/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useRef, useEffect } from "react";
import supabase from "../../supabaseClient";

function AdminUpload() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/drive.file";
  const FOLDER_ID = import.meta.env.VITE_GOOGLE_FOLDER_ID;

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const fileLinkRef = useRef(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://accounts.google.com/gsi/client";
    script2.onload = gisLoaded;
    document.body.appendChild(script2);
  }, []);

  const gapiLoaded = () => {
    gapi.load("client", initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
    });
    gapiInited = true;
  };

  const gisLoaded = () => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // definit ulterior
    });
    gisInited = true;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (!(gapiInited && gisInited)) {
      alert("Vă rugăm să așteptați inițializarea bibliotecilor.");
      return;
    }

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      await startResumableUpload();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  const startResumableUpload = async () => {
    if (!file) {
      alert("Vă rugăm să selectați un fișier.");
      return;
    }

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [FOLDER_ID],
    };

    const initResumableUploadResponse = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + gapi.client.getToken().access_token,
          "Content-Type": "application/json; charset=UTF-8",
          "X-Upload-Content-Type": file.type,
          "X-Upload-Content-Length": file.size,
        }),
        body: JSON.stringify(metadata),
      }
    );

    if (!initResumableUploadResponse.ok) {
      console.error(
        "Failed to initialize resumable upload.",
        initResumableUploadResponse.statusText
      );
      alert("Failed to initialize resumable upload.");
      return;
    }

    const resumableSessionURI =
      initResumableUploadResponse.headers.get("Location");
    console.log("Resumable session URI: ", resumableSessionURI);
    uploadFileChunks(resumableSessionURI, file);
  };

  const uploadFileChunks = async (resumableSessionURI, file) => {
    const CHUNK_SIZE = 262144; // 256 * 1024 bytes
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE);
      const uploadResponse = await fetch(resumableSessionURI, {
        method: "PUT",
        headers: new Headers({
          "Content-Range": `bytes ${offset}-${offset + chunk.size - 1}/${
            file.size
          }`,
        }),
        body: chunk,
      });

      if (uploadResponse.status === 308) {
        const range = uploadResponse.headers.get("Range");
        if (range) {
          offset = parseInt(range.split("-")[1], 10) + 1;
        }
      } else if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log("Upload completed successfully.");
        alert("Fișier încărcat cu succes!");
        const fileLink = `https://drive.google.com/file/d/${result.id}/view`;
        if (fileLinkRef.current) {
          fileLinkRef.current.innerHTML = `<a href="${fileLink}" target="_blank">Accesează fișierul încărcat</a>`;
        }

        // Adaugă cartea în Supabase
        addBookToSupabase(result.id, title, author, category, type, fileLink);
        break;
      } else {
        console.error("Failed to upload chunk.", uploadResponse.statusText);
        alert("Failed to upload chunk.");
        break;
      }
    }
  };

  const addBookToSupabase = async (
    fileId,
    title,
    author,
    category,
    type,
    fileLink
  ) => {
    const { data, error } = await supabase.from("books").insert([
      {
        carte: title,
        autor: author,
        categorie: category,
        format: type,
        link: fileLink,
      },
    ]);

    if (error) {
      console.error("Error adding book to Supabase:", error);
    } else {
      console.log("Book added to Supabase:", data);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        Încărcare fișier în Google Drive
      </h1>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Titlu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Format"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={uploadFile}>Încarcă fișier</button>
      <div ref={fileLinkRef}></div>
    </div>
  );
}

export default AdminUpload;
