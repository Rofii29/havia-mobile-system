"use server";

export async function loginWithToken(token: string) {
  try {
    const response = await fetch('https://brain.havia.id/index.php/api/users', {
      method: 'GET',
      headers: {
        'authtoken': token,
        'Accept': 'application/json'
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return { success: false, error: 'Gagal memverifikasi token (Akses ditolak oleh server).' };
    }
    
    const parsedRes = await response.json();
    console.log("=== API RESPONSE FROM SERVER ===");
    console.log(parsedRes);
    return { success: true, data: parsedRes.data || parsedRes };
  } catch (error: any) {
    return { success: false, error: error.message || 'Terjadi kesalahan koneksi server.' };
  }
}

// Fungsi Generic untuk fetch endpoint API apa saja dari RISE CRM (CORS safe)
export async function fetchFromApi(endpoint: string, token: string) {
  try {
    const url = `https://brain.havia.id/index.php/api/${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authtoken': token,
        'Accept': 'application/json'
      },
      cache: 'no-store',
    });
    
    const textRes = await response.text();
    console.log(`=== RAW RESP FROM ${endpoint} ===`, textRes.substring(0, 200));

    let parsedRes;
    try {
      parsedRes = JSON.parse(textRes);
    } catch (e) {
      return { success: false, error: `Gagal parse JSON dari ${endpoint}. Status: ${response.status}. Response: ` + textRes.substring(0, 200) };
    }
    
    if (!response.ok) {
      console.log(`=== API HTTP ERROR ${response.status} ===`, parsedRes);
      return { 
        success: false, 
        error: `Gagal fetch data dari ${endpoint} (Status: ${response.status}). Pesan: ${parsedRes.message || parsedRes.error || 'Server Internal Error'}`,
        details: parsedRes 
      };
    }
    
    return { success: true, data: parsedRes.data || parsedRes };
  } catch (error: any) {
    return { success: false, error: error.message || `Terjadi kesalahan koneksi saat memanggil ${endpoint}.` };
  }
}
