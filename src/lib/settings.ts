import { createClient } from "@/lib/supabase/server";

export const DEFAULT_WHATSAPP_NUMBER = "447882524986";

export async function getWhatsappNumber(): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;
  return data?.whatsapp_number || DEFAULT_WHATSAPP_NUMBER;
}
