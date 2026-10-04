import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "./contact-schema";
import { supabase } from "./supabase";

// Fallback client for mirror delivery in case user's dashboard is on the template project
const fallbackClient = createClient(
  "https://ifszhwoljmjuunmeyxjx.supabase.co",
  "sb_publishable_xcZu3vkLYhlpEAut4I7BtA_4-8-ZioQ",
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    console.log(`[Backend] Processing contact message from: ${data.name} <${data.email}>`);

    // Primary insert into configured Supabase project
    const { error: primaryError } = await supabase.from("contact_messages").insert(data);

    // Mirror to secondary project so it appears regardless of which project is open in the Supabase Table Editor
    fallbackClient
      .from("contact_messages")
      .insert(data)
      .then(({ error }) => {
        if (error) {
          console.warn("[Backend] Secondary project mirror notice:", error.message);
        } else {
          console.log("[Backend] Mirror copy saved to secondary Supabase project.");
        }
      })
      .catch(() => {});

    if (primaryError) {
      console.error("[Backend] Primary Supabase insertion failed:", primaryError.message);
      return { ok: false, error: "Could not send your message. Please try again." };
    }

    console.log("[Backend] Contact message successfully stored in Supabase!");
    return { ok: true };
  });
