const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

export async function getSheetData<T = Record<string, unknown>>(sheetName: string): Promise<T[]> {
  const response = await fetch(`${API_URL}?sheet=${encodeURIComponent(sheetName)}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data dari sheet ${sheetName}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`Format data dari sheet ${sheetName} tidak valid`);
  }

  return data as T[];
}
