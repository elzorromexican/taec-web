import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userData, messages, metadata } = await request.json();

    // Extraer variables, bypasseando Vite caché en Dev
    let resendKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (import.meta.env.DEV) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envStr = fs.readFileSync(path.resolve('.env'), 'utf8');
        const match = envStr.match(/RESEND_API_KEY="([^"]+)"/);
        if (match && match[1]) {
           resendKey = match[1].replace(/\\s/g, "");
        }
      } catch(e) {}
    }

    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'No Resend API Key found' }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    const emailHtml = \`
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #004775;">Nuevo Lead del Agente IA (Tito Bits) 🤖</h2>
        <p><strong>Nombre del Prospecto:</strong> \${userData.name}</p>
        <p><strong>Email Institucional:</strong> \${userData.email}</p>
        <p><strong>Hora y Zona del Registro:</strong> \${metadata.time} (\${metadata.timeZone})</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <h3 style="color: #004775;">Transcripción Completa de la Conversación:</h3>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          \${messages.map((m: any) => \`
            <div style="margin-bottom: 15px; padding: 12px; border-radius: 8px; background-color: \${m.role === 'user' ? '#e1f0fa' : '#ffffff'}; border: 1px solid \${m.role === 'user' ? '#b6e0fe' : '#e5e7eb'};">
              <strong style="color: \${m.role === 'user' ? '#004775' : '#f59e0b'};">\${m.role === 'user' ? userData.name : 'Tito Bits'}:</strong><br/>
              <span style="font-size: 14px; line-height: 1.5;">\${m.text}</span>
            </div>
          \`).join('')}
        </div>
        
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          *Este correo fue generado automáticamente por el nodo SSR del sitio web de TAEC.
        </p>
      </div>
    \`;

    const { data, error } = await resend.emails.send({
      from: 'Tito Bits <onboarding@resend.dev>',
      to: ['smasmoudi@taec.com.mx'], 
      subject: \`🚨 Nuevo Lead L&D Capturado: \${userData.name}\`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to compile email' }), { status: 500 });
  }
};
