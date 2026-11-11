"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/site/copy-button";

/** WhatsApp number in international format, digits only (no leading +). */
export const WHATSAPP_NUMBER = "218944119965";

/** Human-readable form of the number. */
export const WHATSAPP_DISPLAY = "+218 94 411 9965";

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function WhatsAppContact() {
  const t = useTranslations("contact");
  const templates = t.raw("templates") as string[];
  const [message, setMessage] = useState("");

  function send() {
    const text = message.trim();
    window.open(whatsappLink(text || undefined), "_blank", "noopener");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">{t("numberLabel")}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="font-mono text-lg font-semibold tracking-tight hover:underline"
          >
            {WHATSAPP_DISPLAY}
          </a>
          <CopyButton text={WHATSAPP_DISPLAY} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{t("whatsappNote")}</p>
      </div>

      <div className="space-y-2">
        <Label>{t("templatesLabel")}</Label>
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <Button
              key={template}
              type="button"
              variant="outline"
              size="sm"
              className="h-auto whitespace-normal text-start"
              onClick={() => setMessage(`${template} `)}
            >
              {template}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp-message">{t("message")}</Label>
        <Textarea
          id="whatsapp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
          className="min-h-32"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="lg" onClick={send}>
          <SendIcon className="rtl:rotate-180" />
          {t("submit")}
        </Button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <MessageCircleIcon className="size-4" />
          {t("openWhatsapp")}
        </a>
      </div>

      <p className="text-xs text-muted-foreground">{t("note")}</p>
    </div>
  );
}
