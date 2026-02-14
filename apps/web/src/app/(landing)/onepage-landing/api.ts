const API_URL: string = import.meta.env.VITE_API_URL as string;

/* =========================
   Types
========================= */

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string; // 👈 ahora existe
  message: string;
  pow: {
    nonce: string;
    counter: number;
  };
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

interface ApiValidationError {
  detail?: {
    msg: string;
  }[];
}

/* =========================
   API
========================= */

export async function sendContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  const response: Response = await fetch(
    `${API_URL}/v1/landing/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data: unknown = await response.json();

  if (!response.ok) {
    const errorData = data as ApiValidationError;
    throw new Error(
      errorData?.detail?.[0]?.msg ||
        "Ocurrió un error al enviar tu mensaje."
    );
  }

  return data as ContactResponse;
}
